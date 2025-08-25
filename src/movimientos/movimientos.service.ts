import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto';
import { Movimientos } from './entities/movimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
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

    const nombreTipo = tipoMovimiento.nombre;

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

        const codigosExistentes = await this.codigoRepository.find({
          where: { codigo: In(codigos) },
          select: ['codigo'],
        });

        if (codigosExistentes.length > 0) {
          const repetidos = codigosExistentes.map((c) => c.codigo).join(', ');
          throw new BadRequestException({
            campo: 'codigos',
            message: `Los siguientes códigos ya existen: ${repetidos}`,
          });
        }

        for (const codigo of codigos) {
          await this.codigoRepository.save({
            codigo,
            fkInventario: inventario,
            uso: false,
          });
        }

        inventario.stock += codigos?.length ?? 0;
      } else if (nombreTipo.toLowerCase() === 'devolucion') {
        const codigosEnUsoPrestamo = await this.codigoRepository.find({
          where: {
            fkInventario: { idInventario: inventario.idInventario },
            uso: true,
            fkMovimiento: {
              fkTipoMovimiento: { nombre: ILike('%prestamo%') },
            },
          },
          relations: ['fkMovimiento', 'fkMovimiento.fkTipoMovimiento'],
        });

        const disponiblesParaDevolver = codigosEnUsoPrestamo.map(
          (c) => c.codigo,
        );

        if (!codigos || codigos.length === 0) {
          throw new BadRequestException({
            message: 'Debe especificar códigos para devolver',
            disponibles: disponiblesParaDevolver,
          });
        }

        // 4. Validar que todos los códigos enviados estén en préstamo
        const noPrestados = codigos.filter(
          (c) => !disponiblesParaDevolver.includes(c),
        );

        if (noPrestados.length > 0) {
          throw new BadRequestException(
            `Estos códigos no están en préstamo: ${noPrestados.join(', ')}`,
          );
        }

        // 5. Marcar como disponibles
        await this.codigoRepository.update(
          {
            codigo: In(codigos),
            fkInventario: { idInventario: inventario.idInventario },
          },
          { uso: false },
        );

        // 6. Actualizar stock
        inventario.stock += codigos.length;
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

    const esIngreso = nombreTipo.toLowerCase() === 'ingreso';

    console.log(esIngreso);

    const movimiento = this.movimientoRepository.create({
      fkInventario: inventario,
      fkTipoMovimiento: tipoMovimiento,
      cantidad: cantidad || (codigos?.length ?? 0),
      descripcion,
      fkUsuario: { idUsuario },
      fkSitio: { idSitio: fkSitio },
      enProceso: esIngreso ? false : true,
      aceptado: esIngreso ? true : false,
      cancelado: false,
      horaIngreso: createMovimientoDto.horaIngreso,
      horaSalida: createMovimientoDto.horaSalida,
      fechaDevolucion: createMovimientoDto.fechaDevolucion,
      devolutivo: createMovimientoDto.devolutivo,
      noDevolutivo: createMovimientoDto.noDevolutivo,
      lugarDestino: createMovimientoDto.lugarDestino,
    });

    const move = await this.movimientoRepository.save(movimiento);

    if (tipoMovimiento.nombre.toLowerCase() === 'prestamo' && codigos?.length) {
      await this.codigoRepository.update(
        {
          codigo: In(codigos),
          fkInventario: { idInventario: inventario.idInventario },
        },
        { uso: true, fkMovimiento: move }, // <- AQUÍ ASIGNAMOS EL MOVIMIENTO
      );
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
      relations: ['fkRol'],
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

    if (tipoMovimiento.nombre.toLowerCase() === 'prestamo') {
      await this.notificacionesService.notificarPrestamoConDevolucion({
        ...move,
        usuario,
        elemento: inventario.fkElemento,
      });
    }
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

  // movimientos.service.ts
  async getCodigosParaDevolucion(
    idInventario: number,
  ): Promise<CodigoInventario[]> {
    const inventario = await this.inventarioRepository.findOne({
      where: { idInventario },
      relations: [
        'codigos',
        'codigos.fkMovimiento',
        'codigos.fkMovimiento.fkTipoMovimiento',
      ],
    });

    if (!inventario) throw new NotFoundException('Inventario no encontrado');

    // Filtrar solo códigos que están en uso y cuyo movimiento sea tipo "préstamo"
    return inventario.codigos.filter(
      (c) =>
        c.uso === true &&
        c.fkMovimiento?.fkTipoMovimiento?.nombre
          ?.toLowerCase()
          .includes('prestamo'),
    );
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

  async update(idMovimiento: number, updateMovimientoDto: UpdateMovimientoDto) {
    // 1. Buscar el movimiento por ID
    const getMovimientoById = await this.movimientoRepository.findOne({
      where: { idMovimiento },
    });

    // 2. Validar si existe
    if (!getMovimientoById) {
      throw new Error(
        `No se encontró el movimiento, el id ${idMovimiento} no existe`,
      );
    }

    // 3. Actualizar solo los campos permitidos
    await this.movimientoRepository.update(idMovimiento, {
      horaIngreso: updateMovimientoDto.horaIngreso,
      horaSalida: updateMovimientoDto.horaSalida,
      descripcion: updateMovimientoDto.descripcion,
      fechaDevolucion: updateMovimientoDto.fechaDevolucion,
    });

    // 4. Retornar respuesta
    return {
      status: 200,
      message: 'Movimiento actualizado con éxito',
    };
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
      { estado: 'aceptado' },
    );
    await this.movimientoRepository.save(movimiento);
    await this.notificacionesService.notificarMovimientoAceptado(movimiento);

    return movimiento;
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
      { estado: 'cancelado' },
    );

    return this.movimientoRepository.save(movimiento);
  }
}
