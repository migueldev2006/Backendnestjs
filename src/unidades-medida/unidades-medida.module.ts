import { Module } from '@nestjs/common';
import { UnidadesMedidaService } from './unidades-medida.service';
import { UnidadesMedidaController } from './unidades-medida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadesMedida } from './entities/unidades-medida.entity';

@Module({
  controllers: [UnidadesMedidaController],
  providers: [UnidadesMedidaService],
  imports: [TypeOrmModule.forFeature([UnidadesMedida])],
  exports:[TypeOrmModule]
})
export class UnidadesMedidaModule {}
