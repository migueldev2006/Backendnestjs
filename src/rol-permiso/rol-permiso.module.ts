import { Module } from '@nestjs/common';
import { RolPermisoService } from './rol-permiso.service';
import { RolPermisoController } from './rol-permiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolPermiso } from './entities/rol-permiso.entity';

@Module({
  controllers: [RolPermisoController],
  providers: [RolPermisoService],
    imports: [TypeOrmModule.forFeature([RolPermiso])],
    exports:[TypeOrmModule]
})
export class RolPermisoModule {}
