import { Module } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { ElementosController } from './elementos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementImage, Elementos } from './entities';


@Module({
  controllers: [ElementosController],
  providers: [ElementosService],
  imports: [TypeOrmModule.forFeature([Elementos, ElementImage])],
  exports:[TypeOrmModule]
})
export class ElementosModule {}
