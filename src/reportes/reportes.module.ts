import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';

import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Movimientos } from 'src/movimientos/entities/movimiento.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Elementos } from 'src/elementos/entities/elemento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventarios,
      Movimientos,
      CodigoInventario,
      Usuarios,
      Elementos
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
