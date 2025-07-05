import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly notificacionesService: NotificacionesService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Post()
  async create(@Body() dto: CreateNotificacioneDto) {
    const notificacion = await this.notificacionesService.create(dto);
    this.websocketGateway.emitirNotificacion(notificacion.fkUsuario.idUsuario, notificacion);
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
    @Body('estado') estado: 'aceptado' | 'rechazado',
  ) {
    return this.notificacionesService.cambiarEstado(+idNotificacion, estado);
  }

  @Delete(':idNotificacion')
  remove(@Param('idNotificacion') idNotificacion: number) {
    return this.notificacionesService.remove(+idNotificacion);
  }
}
