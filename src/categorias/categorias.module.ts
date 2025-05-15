import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './entities/categoria.entity';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [TypeOrmModule.forFeature([Categorias])],
  exports:[TypeOrmModule]
})
export class CategoriasModule {}
