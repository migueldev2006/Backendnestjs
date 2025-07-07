import { Module } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { ElementosController } from './elementos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';
import { Elementos } from './entities/elemento.entity';


@Module({
  controllers: [ElementosController],
  providers: [ElementosService],
  imports: [TypeOrmModule.forFeature([Elementos,  Inventarios, Sitios])],
  exports:[TypeOrmModule]
})
export class ElementosModule {}
