import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacione.entity';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  imports: [TypeOrmModule.forFeature([Notificaciones, Inventarios]),  WebsocketModule],
  exports:[TypeOrmModule, NotificacionesService]
  
})
export class NotificacionesModule {}
