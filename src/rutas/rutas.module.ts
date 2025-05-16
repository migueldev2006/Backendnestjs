import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutas } from './entities/ruta.entity';

@Module({
  controllers: [RutasController],
  providers: [RutasService],
  imports: [TypeOrmModule.forFeature([Rutas])],
  exports:[TypeOrmModule]
})
export class RutasModule {}
