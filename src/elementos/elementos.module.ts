import { Module } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { ElementosController } from './elementos.controller';

@Module({
  controllers: [ElementosController],
  providers: [ElementosService],
})
export class ElementosModule {}
