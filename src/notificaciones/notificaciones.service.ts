import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Notificaciones } from './entities/notificacione.entity';
import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private readonly notificacionRepository: Repository<Notificaciones>,
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async create(dto: CreateNotificacioneDto) {
    const usuario = await this.usuarioRepository.findOneByOrFail({
      idUsuario: dto.fkUsuario,
    });

    const nueva = this.notificacionRepository.create({
      titulo: dto.titulo,
      mensaje: dto.mensaje,
      requiereAccion: dto.requiereAccion,
      estado: dto.requiereAccion ? 'enProceso' : null,
      data: dto.data || {},
      fkUsuario: usuario,
    });

    return await this.notificacionRepository.save(nueva);
  }

  async findAll() {
    return this.notificacionRepository.find({
      relations: ['fkUsuario'],
      order: { createdAt: 'DESC' },
    });
  }

async getNotificacionesPorUsuario(idUsuario: number) {
  const notificaciones = await this.notificacionRepository.find({
    where: { fkUsuario: { idUsuario } },
    order: { createdAt: 'DESC' },
  });

  // Obtener los ID de elementos de las notificaciones
  const idsElementos = notificaciones
    .map((n) => n.data?.idElemento)
    .filter((id) => !!id); // solo los que tengan idElemento

  // Consultar estado de esos elementos en inventarios
  const inventarios = await this.inventarioRepository.find({
    where: idsElementos.length > 0 ? { fkElemento: { idElemento: In(idsElementos) } } : {},
    relations: ['fkElemento'],
  });

  // Crear un mapa de idElemento => estado
  const estadoPorElemento: Record<number, boolean> = {};
  for (const inv of inventarios) {
    const idEl = inv.fkElemento?.idElemento;
    if (idEl && inv.estado === true) {
      estadoPorElemento[idEl] = true;
    }
  }

  // Filtrar las notificaciones con idElemento cuyo inventario esté activo, o que no tengan idElemento
  return notificaciones.filter((n) => {
    const idEl = n.data?.idElemento;
    return !idEl || estadoPorElemento[idEl] === true;
  });
}


  async findOne(id: number) {
    const notificacion = await this.notificacionRepository.findOne({
      where: { idNotificacion: id },
      relations: ['fkUsuario'],
    });

    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }

    return notificacion;
  }

  async update(id: number, dto: UpdateNotificacioneDto) {
    const updateData: any = { ...dto };
    if (dto.fkUsuario && typeof dto.fkUsuario === 'number') {
      updateData.fkUsuario = { idUsuario: dto.fkUsuario };
    }

    await this.notificacionRepository.update(id, updateData);
    return this.findOne(id);
  }

  async marcarComoLeida(id: number) {
    const notificacion = await this.findOne(id);
    notificacion.leido = true;
    return this.notificacionRepository.save(notificacion);
  }

  async cambiarEstado(id: number, estado: 'aceptado' | 'cancelado') {
    const notificacion = await this.findOne(id);

    if (!notificacion.requiereAccion) {
      throw new Error('Esta notificación no requiere acción');
    }

    notificacion.estado = estado;
    notificacion.leido = true;
    return this.notificacionRepository.save(notificacion);
  }

  async remove(id: number) {
    const existe = await this.notificacionRepository.findOne({
      where: { idNotificacion: id },
    });
    if (!existe) throw new NotFoundException('Notificación no encontrada');

    return this.notificacionRepository.remove(existe);
  }

  async enviarYGuardarNotificacion(
    titulo: string,
    mensaje: string,
    requiereAccion: boolean,
    usuario: Usuarios,
    data: any = {},
    estado?: 'enProceso' | 'aceptado' | 'cancelado',
  ) {
    const notificacion = this.notificacionRepository.create({
      titulo,
      mensaje,
      requiereAccion,
      estado: requiereAccion ? (estado ?? 'enProceso') : null,
      data,
      leido: false,
      fkUsuario: usuario,
    });

    const guardada = await this.notificacionRepository.save(notificacion);
    this.websocketGateway.emitirNotificacion(usuario.idUsuario, guardada);
  }

  async notificarMovimientoPendiente(movimiento: any) {
    if (['Salida', 'Prestamo'].includes(movimiento.tipo.nombre)) {
      const receptores = await this.usuarioRepository.find({
        where: [
          { fkRol: { nombre: 'Administrador' } },
          { fkRol: { nombre: 'Lider' } },
        ],
        relations: ['fkRol'],
      });

      // Si no hay nadie con esos roles, no hacemos nada
      if (!receptores || receptores.length === 0) return;

      const mensaje = `Movimiento de tipo ${movimiento.tipo.nombre} por ${movimiento.usuario.nombre}. Requiere revisión.`;

      for (const user of receptores) {
        // Omitimos al que hizo el movimiento
        if (user.idUsuario === movimiento.usuario.idUsuario) continue;

        await this.enviarYGuardarNotificacion(
          'Movimiento pendiente',
          mensaje,
          true,
          user,
          { idMovimiento: movimiento.idMovimiento },
          'enProceso',
        );
      }
    }
  }

  async notificarIngreso(movimiento: any) {
    if (movimiento.tipo.nombre === 'Ingreso') {
      const admins = await this.usuarioRepository.find({
        where: {
          fkRol: {
            nombre: 'Administrador',
          },
        },
        relations: ['fkRol'],
      });
      const lider = await this.usuarioRepository.findOne({
        where: {
          fkRol: { nombre: 'Lider' },
        },
      });

      const mensaje = `Ingreso de ${movimiento.cantidad} "${movimiento.elemento.nombre}" por ${movimiento.usuario.nombre} al sitio ${movimiento.sitio.nombre}.`;

      for (const admin of admins) {
        await this.enviarYGuardarNotificacion(
          'Ingreso registrado',
          mensaje,
          false,
          admin,
          {
            idMovimiento: movimiento.id,
          },
        );
      }

      if (lider) {
        await this.enviarYGuardarNotificacion(
          'Ingreso registrado',
          mensaje,
          false,
          lider,
          {
            idMovimiento: movimiento.id,
          },
        );
      }
    }
  }

  async notificarStockBajo(inventario: any) {
    if (inventario.estado !== true) return;
    if (inventario.stock <= 10) {
      const admins = await this.usuarioRepository.find({
        where: { fkRol: { nombre: 'Administrador' } },
      });
      const mensaje = `Stock bajo de ese elemento "${inventario.fkElemento.nombre}"`;

      for (const admin of admins) {
        console.log('👉 Enviando notificación a:', admin.idUsuario);
        await this.enviarYGuardarNotificacion(
          'Stock bajo',
          mensaje,
          false,
          admin,
          {
            idElemento: inventario.fkElemento.idElemento,
          },
        );
      }
    }
  }

  async notificarProximaCaducidad(inventario: any) {
    if (inventario.estado !== true) return;
    const hoy = new Date();
    const fechaCaducidad = new Date(inventario.fechaVencimiento);
    const diasRestantes = Math.ceil(
      (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diasRestantes <= 7) {
      const admins = await this.usuarioRepository.find({
        where: { fkRol: { nombre: 'Administrador' } },
      });
      const mensaje = `El elemento "${inventario.fkElemento.nombre}" caduca en ${diasRestantes} días.`;

      for (const admin of admins) {
        await this.enviarYGuardarNotificacion(
          'Elemento por caducar',
          mensaje,
          false,
          admin,
          {
            idElemento: inventario.fkElemento.idElemento,
            fechaCaducidad: inventario.fkElemento.fechaVencimiento,
          },
        );
      }
    }
  }

  async verificarInventariosYNotificar() {
    const inventarios = await this.inventarioRepository.find({
      relations: ['fkElemento'],
    });

    for (const inventario of inventarios) {
      await this.notificarStockBajo(inventario);
      await this.notificarProximaCaducidad(inventario);
    }
  }
}
