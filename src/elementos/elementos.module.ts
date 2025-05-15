import { Module } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { ElementosController } from './elementos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Elementos } from './entities/elemento.entity';

@Module({
  controllers: [ElementosController],
  providers: [ElementosService],
  imports: [TypeOrmModule.forFeature([Elementos])],
  exports:[TypeOrmModule]
})
export class ElementosModule {}
