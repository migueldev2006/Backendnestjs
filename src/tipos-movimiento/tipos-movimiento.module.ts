import { Module } from '@nestjs/common';
import { TiposMovimientoService } from './tipos-movimiento.service';
import { TiposMovimientoController } from './tipos-movimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMovimientos } from './entities/tipos-movimiento.entity';

@Module({
  controllers: [TiposMovimientoController],
  providers: [TiposMovimientoService],
  imports: [TypeOrmModule.forFeature([TipoMovimientos])],
  exports:[TypeOrmModule]
})
export class TiposMovimientoModule {}
