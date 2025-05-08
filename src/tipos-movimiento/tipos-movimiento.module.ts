import { Module } from '@nestjs/common';
import { TiposMovimientoService } from './tipos-movimiento.service';
import { TiposMovimientoController } from './tipos-movimiento.controller';

@Module({
  controllers: [TiposMovimientoController],
  providers: [TiposMovimientoService],
})
export class TiposMovimientoModule {}
