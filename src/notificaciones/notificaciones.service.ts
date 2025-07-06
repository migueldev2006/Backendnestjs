  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Notificaciones } from './entities/notificacione.entity';
  import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';
  import { Usuarios } from 'src/usuarios/entities/usuario.entity';
  import { WebsocketGateway } from 'src/websocket/websocket.gateway';

  @Injectable()
  export class NotificacionesService {
    constructor(
      @InjectRepository(Notificaciones)
      private readonly notificacionRepository: Repository<Notificaciones>,
      @InjectRepository(Usuarios)
      private readonly usuarioRepository: Repository<Usuarios>,
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
        estado: dto.requiereAccion ? 'pendiente' : null,
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
      return this.notificacionRepository.find({
        where: { fkUsuario: { idUsuario } },
        order: { createdAt: 'DESC' },
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

    async cambiarEstado(id: number, estado: 'aceptado' | 'rechazado') {
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
      estado?: 'pendiente' | 'aceptado' | 'rechazado',
    ) {
      const notificacion = this.notificacionRepository.create({
        titulo,
        mensaje,
        requiereAccion,
        estado: requiereAccion ? (estado ?? 'pendiente') : null,
        data,
        leido: false,
        fkUsuario: usuario,
      });

      const guardada = await this.notificacionRepository.save(notificacion);
      this.websocketGateway.emitirNotificacion(usuario.idUsuario, guardada);
    }

    async notificarMovimientoPendiente(movimiento: any) {
      if (['salida', 'prestamo'].includes(movimiento.tipo.nombre)) {
        const admin = await this.usuarioRepository.findOne({
          where: {
            fkRol: {
              nombre: 'administrador',
            },
          },
          relations: ['fkRol'],
        });

        if (!admin) return;

        const mensaje = `Movimiento de tipo ${movimiento.tipo.nombre} por ${movimiento.usuario.nombre}. Requiere revisión.`;

        await this.enviarYGuardarNotificacion(
          'Movimiento pendiente',
          mensaje,
          true,
          admin,
          { idMovimiento: movimiento.idMovimiento },
          'pendiente',
        );
      }
    }

    async notificarIngreso(movimiento: any) {
      if (movimiento.tipo.nombre === 'ingreso') {
        const admins = await this.usuarioRepository.find({
          where: {
            fkRol: {
              nombre: 'administrador',
            },
          },
          relations: ['fkRol'],
        });
        const lider = await this.usuarioRepository.findOne({
          where: {
            fkRol: { nombre: 'lider' },
            // fkSitio: movimiento.sitio.id,
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
      if (inventario.stock <= 10) {
        const admins = await this.usuarioRepository.find({
          where: { fkRol: { nombre: 'administrador' } },
        });
        const mensaje = `Stock bajo de ese elemento"`;

        for (const admin of admins) {
          await this.enviarYGuardarNotificacion(
            'Stock bajo',
            mensaje,
            false,
            admin,
            {
              idElemento: inventario.elemento.id,
            },
          );
        }
      }
    }

    async notificarProximaCaducidad(inventario: any) {
      const hoy = new Date();
      const fechaCaducidad = new Date(inventario.fecha_caducidad);
      const diasRestantes = Math.ceil(
        (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diasRestantes <= 7) {
        const admins = await this.usuarioRepository.find({
          where: { fkRol: { nombre: 'administrador' } },
        });
        const mensaje = `El elemento "${inventario.elemento.nombre}" caduca en ${diasRestantes} días.`;

        for (const admin of admins) {
          await this.enviarYGuardarNotificacion(
            'Elemento por caducar',
            mensaje,
            false,
            admin,
            {
              idElemento: inventario.elemento.id,
              fechaCaducidad: inventario.fecha_caducidad,
            },
          );
        }
      }
    }

    async notificarFechaUso(inventario: any) {
      const hoy = new Date();
      const fechaUso = new Date(inventario.fechaUso);
      const diasRestantes = Math.ceil(
        (fechaUso.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diasRestantes <= 15) {
        const admins = await this.usuarioRepository.find({
          where: { fkRol: { nombre: 'administrador' } },
        });
        const mensaje = `El elemento "${inventario.elemento.nombre}" debe usarse antes del ${inventario.fecha_limite_uso}. Faltan ${diasRestantes} días.`;

        for (const admin of admins) {
          await this.enviarYGuardarNotificacion(
            'Uso próximo a vencer',
            mensaje,
            false,
            admin,
            {
              idElemento: inventario.elemento.idElemento,
              fechaLimiteUso: inventario.fechaUso,
            },
          );
        }
      }
    }
  }
