import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(

    private readonly notificacionesService: NotificacionesService,
      @InjectRepository(Usuarios)
  private readonly usuarioRepository: Repository<Usuarios>,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Post()
  async create(@Body() dto: CreateNotificacioneDto) {
    const notificacion = await this.notificacionesService.create(dto);
    this.websocketGateway.emitirNotificacion(
      notificacion.fkUsuario.idUsuario,
      notificacion,
    );
    return notificacion;
  }

  @Get('usuario/:idUsuario')
  getNotificacionesPorUsuario(@Param('idUsuario') idUsuario: number) {
    return this.notificacionesService.getNotificacionesPorUsuario(+idUsuario);
  }

  @Get()
  findAll() {
    return this.notificacionesService.findAll();
  }

  @Get(':idNotificacion')
  findOne(@Param('idNotificacion') idNotificacion: number) {
    return this.notificacionesService.findOne(+idNotificacion);
  }

  @Patch(':idNotificacion')
  update(
    @Param('idNotificacion') idNotificacion: number,
    @Body() dto: UpdateNotificacioneDto,
  ) {
    return this.notificacionesService.update(+idNotificacion, dto);
  }

  @Patch(':idNotificacion/leida')
  marcarComoLeida(@Param('idNotificacion') idNotificacion: number) {
    return this.notificacionesService.marcarComoLeida(+idNotificacion);
  }

  @Patch(':idNotificacion/estado')
  cambiarEstado(
    @Param('idNotificacion') idNotificacion: number,
    @Body('estado') estado: 'aceptado' | 'cancelado',
  ) {
    return this.notificacionesService.cambiarEstado(+idNotificacion, estado);
  }

  @Delete(':idNotificacion')
  remove(@Param('idNotificacion') idNotificacion: number) {
    return this.notificacionesService.remove(+idNotificacion);
  }

  @Get('verificar-inventario/:idUsuario')
  async verificarInventario(@Param('idUsuario') id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: id },
      relations: ['fkRol'],
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }


    if (!['Administrador', 'Lider'].includes(usuario.fkRol.nombre)) {
      throw new NotFoundException('No autorizado para esta operación');
    }

    await this.notificacionesService.verificarInventariosYNotificar();

    return { mensaje: 'Revisión de inventarios ejecutada' };
  }
}
