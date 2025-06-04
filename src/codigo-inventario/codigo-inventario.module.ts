import { Module } from '@nestjs/common';
import { CodigoInventarioService } from './codigo-inventario.service';
import { CodigoInventarioController } from './codigo-inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigoInventario } from './entities/codigo-inventario.entity';

@Module({
  controllers: [CodigoInventarioController],
  providers: [CodigoInventarioService],
  imports: [TypeOrmModule.forFeature([CodigoInventario])],
  exports: [TypeOrmModule],
})
export class CodigoInventarioModule {}
