import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './entities/movimiento.entity';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { TipoMovimientos } from 'src/tipos-movimiento/entities/tipos-movimiento.entity';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';

@Module({
  controllers: [MovimientosController],
  providers: [MovimientosService],
  imports: [TypeOrmModule.forFeature([Movimientos, Inventarios, CodigoInventario, TipoMovimientos]), NotificacionesModule],
  exports:[TypeOrmModule]
})
export class MovimientosModule {}
