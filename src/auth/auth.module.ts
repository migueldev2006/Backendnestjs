import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoGuard } from './guards/permiso.guard';
import { RolPermiso } from 'src/rol-permiso/entities/rol-permiso.entity';

@Global()
@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Usuarios,RolPermiso])],
  providers: [AuthService, PermisoGuard],
  exports: [PermisoGuard,TypeOrmModule]
})
export class AuthModule {}
