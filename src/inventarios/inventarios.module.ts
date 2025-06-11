import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventarios } from './entities/inventario.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';

@Module({
  controllers: [InventariosController],
  providers: [InventariosService],
  imports: [TypeOrmModule.forFeature([Inventarios, CodigoInventario])],
  exports:[TypeOrmModule]
})
export class InventariosModule {}
