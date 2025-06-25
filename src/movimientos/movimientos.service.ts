import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto';
import { Movimientos } from './entities/movimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { TipoMovimientos } from 'src/tipos-movimiento/entities/tipos-movimiento.entity';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimientos)
    private readonly movimientoRepository: Repository<Movimientos>,

    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,

    @InjectRepository(CodigoInventario)
    private readonly codigoRepository: Repository<CodigoInventario>,

    @InjectRepository(TipoMovimientos)
    private readonly tipoRepository: Repository<TipoMovimientos>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimientos> {
    const {
      fkInventario,
      fkTipoMovimiento,
      cantidad,
      fkUsuario,
      fkSitio,
      descripcion,
      codigos,
    } = createMovimientoDto;

    const inventario = await this.inventarioRepository.findOne({
      where: { idInventario: fkInventario },
      relations: ['fkElemento', 'fkElemento.fkCaracteristica'],
    });
    if (!inventario) throw new NotFoundException('Inventario no encontrado');

    const tieneCaracteristicas = !!inventario.fkElemento?.fkCaracteristica;
    const tipoMovimiento = await this.tipoRepository.findOneBy({
      idTipo: fkTipoMovimiento,
    });
    if (!tipoMovimiento)
      throw new NotFoundException('Tipo de movimiento inválido');

    const nombreTipo = tipoMovimiento.nombre.toLowerCase();

    if (tieneCaracteristicas) {
      if (['salida', 'baja', 'prestamo'].includes(nombreTipo)) {
        if (!codigos || codigos.length === 0) {
          throw new BadRequestException(
            'Debe especificar códigos para este movimiento',
          );
        }

        const codigosDisponibles = await this.codigoRepository.find({
          where: { codigo: In(codigos), fkInventario: inventario, uso: false },
        });

        if (codigosDisponibles.length !== codigos.length) {
          const disponibles = codigosDisponibles.map((c) => c.codigo);
          const faltantes = codigos.filter((c) => !disponibles.includes(c));
          throw new BadRequestException(
            `Los siguientes códigos no están disponibles: ${faltantes.join(', ')}`,
          );
        }

        await this.codigoRepository.update(
          { codigo: In(codigos), fkInventario: inventario },
          { uso: true },
        );

        inventario.stock -= codigos.length;
      } else if (nombreTipo === 'ingreso') {
        if (!codigos || codigos.length === 0) {
          throw new BadRequestException(
            'Debe especificar códigos para este movimiento',
          );
        }
        for (const codigo of codigos) {
          await this.codigoRepository.save({
            codigo,
            fkInventario: inventario,
            usado: false,
          });
        }

        inventario.stock += codigos?.length ?? 0;
      }
    } else {
      if (['salida', 'baja', 'prestamo'].includes(nombreTipo)) {
        if (!cantidad || cantidad <= 0) {
          throw new BadRequestException('Debe indicar cantidad válida');
        }
        if (cantidad > inventario.stock) {
          throw new BadRequestException('No hay suficiente stock');
        }

        inventario.stock -= cantidad;
      } else if (['ingreso', 'devolucion'].includes(nombreTipo)) {
        if (!cantidad || cantidad <= 0) {
          throw new BadRequestException('Debe indicar cantidad válida');
        }

        inventario.stock += cantidad;
      }
    }

    await this.inventarioRepository.save(inventario);

    const movimiento = this.movimientoRepository.create({
      fkInventario: inventario,
      fkTipoMovimiento:tipoMovimiento,
      cantidad: cantidad || (codigos?.length ?? 0),
      descripcion,
      fkUsuario: { idUsuario: fkUsuario },
      fkSitio: { idSitio: fkSitio },
      enProceso: true,
      aceptado: false,
      cancelado: false,
    });

    return await this.movimientoRepository.save(movimiento);
  }

  async findAll(): Promise<Movimientos[]> {
    return await this.movimientoRepository.find();
  }

  async findOne(idMovimiento: number): Promise<Movimientos | null> {
    const getMovimientoById = await this.movimientoRepository.findOneBy({
      idMovimiento,
    });

    if (!getMovimientoById) {
      throw new Error(`No existe el movimiento con ese id`);
    }

    return getMovimientoById;
  }

  async update(
    idMovimiento: number,
    updateMovimientoDto: UpdateMovimientoDto,
  ): Promise<Movimientos> {
    const getMovimientoById = await this.movimientoRepository.findOneBy({
      idMovimiento,
    });

    if (!getMovimientoById) {
      throw new Error(`No existe el movimiento con ese id`);
    }

    await this.movimientoRepository.update(idMovimiento, {
      horaIngreso: updateMovimientoDto.horaIngreso,
      horaSalida: updateMovimientoDto.horaSalida,
      descripcion: updateMovimientoDto.descripcion,
      cantidad: updateMovimientoDto.cantidad,
      fechaDevolucion: updateMovimientoDto.fechaDevolucion,
    });


  const updatedMovimiento = await this.movimientoRepository.save(getMovimientoById);
  return updatedMovimiento;
  }

  async accept(idMovimiento: number): Promise<Movimientos> {
    const movimiento = await this.movimientoRepository.findOneBy({
      idMovimiento,
    });
    if (!movimiento) {
      throw new NotFoundException(
        `La movimiento con id ${idMovimiento} no existe`,
      );
    }

    if (!movimiento.enProceso) {
      throw new BadRequestException('Este movimiento ya fue gestionado');
    }

    movimiento.aceptado = true;
    movimiento.enProceso = false;
    movimiento.cancelado = false;

    return this.movimientoRepository.save(movimiento);
  }
  async cancel(idMovimiento: number): Promise<Movimientos> {
    const movimiento = await this.movimientoRepository.findOneBy({
      idMovimiento,
    });
    if (!movimiento) {
      throw new NotFoundException(
        `La movimiento con id ${idMovimiento} no existe`,
      );
    }

    if (!movimiento.enProceso) {
      throw new BadRequestException('Este movimiento ya fue gestionado');
    }

    movimiento.aceptado = false;
    movimiento.enProceso = false;
    movimiento.cancelado = true;

    return this.movimientoRepository.save(movimiento);
  }
}
