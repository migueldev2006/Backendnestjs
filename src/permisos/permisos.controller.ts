import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto, UpdatePermisoDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';

@UseGuards(JwtGuard)
@UseGuards(PermisoGuard)
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  @Permiso(23)
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @Get()
  @Permiso(24)
  findAll() {
    return this.permisosService.findAll();
  }

  @Get(':idPermiso')
  @Permiso(25)
  findOne(@Param('idPermiso') idPermiso: number) {
    return this.permisosService.findOne(+idPermiso);
  }

  @Patch(':idPermiso')
  @Permiso(26)
  update(@Param('idPermiso') idPermiso: number, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(+idPermiso, updatePermisoDto);
  }
}
