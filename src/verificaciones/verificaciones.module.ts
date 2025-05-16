import { Module } from '@nestjs/common';
import { VerificacionesService } from './verificaciones.service';
import { VerificacionesController } from './verificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verificaciones } from './entities/verificacione.entity';

@Module({
  controllers: [VerificacionesController],
  providers: [VerificacionesService],
  imports: [TypeOrmModule.forFeature([Verificaciones])],
  exports:[TypeOrmModule]
})
export class VerificacionesModule {}
