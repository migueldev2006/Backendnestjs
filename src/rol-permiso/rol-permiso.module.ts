import { Module } from '@nestjs/common';
import { RolPermisoService } from './rol-permiso.service';
import { RolPermisoController } from './rol-permiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolPermiso } from './entities/rol-permiso.entity';
import { PermisosService } from 'src/permisos/permisos.service';
import { Permisos } from 'src/permisos/entities/permiso.entity';

@Module({
  controllers: [RolPermisoController],
  providers: [RolPermisoService],
  imports: [TypeOrmModule.forFeature([RolPermiso, Permisos])],
  exports:[TypeOrmModule]
})
export class RolPermisoModule {}
