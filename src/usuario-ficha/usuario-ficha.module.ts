import { Module } from '@nestjs/common';
import { UsuarioFichaService } from './usuario-ficha.service';
import { UsuarioFichaController } from './usuario-ficha.controller';

@Module({
  controllers: [UsuarioFichaController],
  providers: [UsuarioFichaService],
})
export class UsuarioFichaModule {}
