import { Module } from '@nestjs/common';
import { UsuarioFichaService } from './usuario-ficha.service';
import { UsuarioFichaController } from './usuario-ficha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioFicha } from './entities/usuario-ficha.entity';

@Module({
  controllers: [UsuarioFichaController],
  providers: [UsuarioFichaService],
  imports: [TypeOrmModule.forFeature([UsuarioFicha])],
  exports:[TypeOrmModule]
})
export class UsuarioFichaModule {}
