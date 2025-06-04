import { Module } from '@nestjs/common';
import { VerificacionesService } from './verificaciones.service';
import { VerificacionesController } from './verificaciones.controller';

@Module({
  controllers: [VerificacionesController],
  providers: [VerificacionesService],
})
export class VerificacionesModule {}
