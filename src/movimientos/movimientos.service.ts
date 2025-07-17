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
import { Notificaciones } from 'src/notificaciones/entities/notificacione.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';

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

    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,

    @InjectRepository(Notificaciones)
    private readonly notificacionRepository: Repository<Notificaciones>,

    private readonly notificacionesService: NotificacionesService,
  ) {}

  async create(
    createMovimientoDto: CreateMovimientoDto,
    idUsuario: number,
  ): Promise<Movimientos> {
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

    const nombreTipo = tipoMovimiento.nombre ;

    if (tieneCaracteristicas) {
      if (['salida', 'baja', 'prestamo'].includes(nombreTipo.toLowerCase())) {
        if (!codigos || codigos.length === 0) {
          throw new BadRequestException(
            'Debe especificar códigos para este movimiento',
          );
        }

        const codigosDisponibles = await this.codigoRepository.find({
          where: {
            fkInventario: { idInventario: inventario.idInventario },
            uso: false,
          },
        });

        const disponibles = codigosDisponibles.map((c) => c.codigo);

        const faltanes = codigos.filter((c) => !disponibles.includes(c));


        if (faltanes.length > 0) {
          throw new BadRequestException(
            `Estos codigos no estan disponibles: ${faltanes}`,
          );
        }

        await this.codigoRepository.update(
          {
            codigo: In(codigos),
            fkInventario: { idInventario: inventario.idInventario },
          },
          { uso: true },
        );

        inventario.stock -= codigos.length;
      } else if (nombreTipo.toLowerCase() === 'ingreso') {
        if (!codigos || codigos.length === 0) {
          throw new BadRequestException(
            'Debe especificar códigos para este movimiento',
          );
        }
        for (const codigo of codigos) {
          await this.codigoRepository.save({
            codigo,
            fkInventario: inventario,
            uso: false,
          });
        }

        inventario.stock += codigos?.length ?? 0;
      }
    } else {
      if (['salida', 'baja', 'prestamo'].includes(nombreTipo.toLowerCase())) {
        if (!cantidad || cantidad <= 0) {
          throw new BadRequestException('Debe indicar cantidad válida');
        }
        if (cantidad > inventario.stock) {
          throw new BadRequestException('No hay suficiente stock');
        }

        inventario.stock -= cantidad;
      } else if (['ingreso', 'devolucion'].includes(nombreTipo.toLowerCase())) {
        if (!cantidad || cantidad <= 0) {
          throw new BadRequestException('Debe indicar cantidad válida');
        }

        inventario.stock += cantidad;
      }
    }

    await this.inventarioRepository.save(inventario);

    const movimiento = this.movimientoRepository.create({
      fkInventario: inventario,
      fkTipoMovimiento: tipoMovimiento,
      cantidad: cantidad || (codigos?.length ?? 0),
      descripcion,
      fkUsuario: { idUsuario },
      fkSitio: { idSitio: fkSitio },
      enProceso: true,
      aceptado: false,
      cancelado: false,
      horaIngreso: createMovimientoDto.horaIngreso,
      horaSalida: createMovimientoDto.horaSalida,
      fechaDevolucion: createMovimientoDto.fechaDevolucion,
      devolutivo: createMovimientoDto.devolutivo,
      noDevolutivo: createMovimientoDto.noDevolutivo,
      lugarDestino: createMovimientoDto.lugarDestino,
    });

    const move = await this.movimientoRepository.save(movimiento);

    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
      relations: ['fkRol']
    });

    await this.notificacionesService.notificarMovimientoPendiente({
      idMovimiento: move.idMovimiento,
      tipo: tipoMovimiento,
      usuario, 
      sitio: { id: fkSitio, nombre: inventario.fkSitio?.nombre || 'Sitio' },
    });

    await this.notificacionesService.notificarIngreso({
      id: move.idMovimiento,
      tipo: tipoMovimiento,
      cantidad: move.cantidad,
      elemento: inventario.fkElemento,
      usuario,
      sitio: { id: fkSitio, nombre: inventario.fkSitio?.nombre || 'Sitio' },
    });

      await this.notificacionesService.notificarStockBajo(
      inventario
      
    );

    return move;
  }

  async findAll(): Promise<Movimientos[]> {
    return await this.movimientoRepository.find({
      relations: [
        'fkInventario',
        'fkInventario.fkElemento',
        'fkSitio',
        'fkTipoMovimiento',
        'fkUsuario',
      ],
    });
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

    const updatedMovimiento =
      await this.movimientoRepository.save(getMovimientoById);
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
    
    await this.notificacionRepository.update(
  { data: { idMovimiento: movimiento.idMovimiento } },
  { estado: 'aceptado' }
);

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

    await this.notificacionRepository.update(
  { data: { idMovimiento: movimiento.idMovimiento } },
  { estado: 'cancelado' }
);

    return this.movimientoRepository.save(movimiento);
  }
}
