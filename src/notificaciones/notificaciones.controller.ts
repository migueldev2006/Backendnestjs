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

  @Delete(':idNotificacion')
  remove(@Param('idNotificacion') idNotificacion: number) {
    return this.notificacionesService.remove(+idNotificacion);
  }
}
