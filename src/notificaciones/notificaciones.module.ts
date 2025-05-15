import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacione.entity';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  imports: [TypeOrmModule.forFeature([Notificaciones])],
  exports:[TypeOrmModule]
})
export class NotificacionesModule {}
