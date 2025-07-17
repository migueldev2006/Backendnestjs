import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AgregarStockDto,
  CreateInventarioDto,
  UpdateInventarioDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventarios } from './entities/inventario.entity';
import { Repository } from 'typeorm';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,

    @InjectRepository(CodigoInventario)
    private readonly codigosRepository: Repository<CodigoInventario>,

    private readonly notificacionesService: NotificacionesService,
  ) {}
  async create(createInventarioDto: CreateInventarioDto): Promise<Inventarios> {
    const inventario = this.inventarioRepository.create({
      ...createInventarioDto,
      fkElemento: { idElemento: createInventarioDto.fkElemento },
      fkSitio: { idSitio: createInventarioDto.fkSitio },
    });
    return await this.inventarioRepository.save(inventario);
  }

  async agregateStock(agregateStock: AgregarStockDto) {
    const agregateStockInventario = await this.inventarioRepository.findOne({
      where: {
        fkElemento: { idElemento: agregateStock.fkElemento },
        fkSitio: { idSitio: agregateStock.fkSitio },
      },
      relations: ['fkElemento', 'fkElemento.fkCaracteristica', 'fkSitio'],
    });

    if (!agregateStockInventario) {
      throw new NotFoundException('Inventario no encontrado');
    }
    if (agregateStockInventario.fkElemento.fkCaracteristica) {
      if (!agregateStock.codigos || agregateStock.codigos.length === 0) {
        throw new Error('Este elemento requiere códigos para agregar stock');
      }

      for (const codigo of agregateStock.codigos) {
        await this.codigosRepository.save({
          codigo,
          fkInventario: agregateStockInventario,
        });
      }

      agregateStockInventario.stock += agregateStock.codigos.length;
    }
    await this.inventarioRepository.save(agregateStockInventario);

    await this.notificacionesService.notificarStockBajo(
      agregateStockInventario,
    );

    if (
      agregateStockInventario.fkElemento?.perecedero &&
      agregateStockInventario.fkElemento?.fechaVencimiento
    ) {
      await this.notificacionesService.notificarProximaCaducidad({
        elemento: agregateStockInventario.fkElemento,
        fecha_caducidad: agregateStockInventario.fkElemento.fechaVencimiento,
      });
    }

    return { message: 'Stock actualizado correctamente' };
  }

  async findAll(): Promise<Inventarios[]> {
    return await this.inventarioRepository.find({
      relations: [
        'fkSitio',
        'fkElemento',
        'fkElemento.fkCaracteristica',
        'codigos',
      ],
    });
  }

  async findOne(idInventario: number): Promise<Inventarios | null> {
    const getInventarioById = await this.inventarioRepository.findOneBy({
      idInventario,
    });

    if (!getInventarioById) {
      throw new Error(
        `No hay elementos registrados en el inventario con este id`,
      );
    }

    return getInventarioById;
  }

  async update(
    idInventario: number,
    updateInventarioDto: UpdateInventarioDto,
  ): Promise<Inventarios> {
    const getInventarioById = await this.inventarioRepository.findOne({
      where: { idInventario },
      relations: ['fkElemento', 'fkElemento.fkCaracteristica'],
    });

    if (!getInventarioById) {
      throw new Error(
        `No hay elementos registrados en el inventario con este id`,
      );
    }

    if (getInventarioById.fkElemento.fkCaracteristica) {
      throw new BadRequestException(
        'Este inventario requiere códigos. Use el método de agregar stock por códigos.',
      );
    }

    if (!updateInventarioDto.stock || updateInventarioDto.stock <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0');
    }

    getInventarioById.stock += updateInventarioDto.stock;

    const updatedInventario =
      await this.inventarioRepository.save(getInventarioById);

    await this.notificacionesService.notificarStockBajo(updatedInventario);

    const { fkElemento } = updatedInventario;

    if (fkElemento?.perecedero && fkElemento?.fechaVencimiento) {
      await this.notificacionesService.notificarProximaCaducidad({
        elemento: fkElemento,
        fecha_caducidad: fkElemento.fechaVencimiento,
      });
    }

    return updatedInventario;
  }

  async changeStatus(idInventario: number): Promise<Inventarios> {
    const getInventarioById = await this.inventarioRepository.findOneBy({
      idInventario,
    });

    if (!getInventarioById) {
      throw new Error(
        `No hay elementos registrados en el inventario con este id`,
      );
    }

    getInventarioById.estado = !getInventarioById.estado;

    return await this.inventarioRepository.save(getInventarioById);
  }
}
