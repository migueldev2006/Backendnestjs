import { Module } from '@nestjs/common';
import { CaracteristicasService } from './caracteristicas.service';
import { CaracteristicasController } from './caracteristicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracteristicas } from './entities/caracteristica.entity';

@Module({
  controllers: [CaracteristicasController],
  providers: [CaracteristicasService],
  imports: [TypeOrmModule.forFeature([Caracteristicas])],
  exports:[TypeOrmModule]
})
export class CaracteristicasModule {}
