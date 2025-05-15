import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuario.entity';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [TypeOrmModule.forFeature([Usuarios])],
  exports:[TypeOrmModule]
})
export class UsuariosModule {}
