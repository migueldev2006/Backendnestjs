import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './entities/movimiento.entity';

@Module({
  controllers: [MovimientosController],
  providers: [MovimientosService],
  imports: [TypeOrmModule.forFeature([Movimientos])],
  exports:[TypeOrmModule]
})
export class MovimientosModule {}
