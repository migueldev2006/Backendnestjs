import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolPermisoService } from './rol-permiso.service';
import { CreateRolPermisoDto, UpdateRolPermisoDto } from './dto';

@Controller('rol-permiso')
export class RolPermisoController {
  constructor(private readonly rolPermisoService: RolPermisoService) {}

  @Post()
  create(@Body() createRolPermisoDto: CreateRolPermisoDto) {
    return this.rolPermisoService.create(createRolPermisoDto);
  }

  @Get()
  findAll() {
    return this.rolPermisoService.findAll();
  }

  @Get(':idRolPermiso')
  findOne(@Param('idRolPermiso') idRolPermiso: number) {
    return this.rolPermisoService.findOne(+idRolPermiso);
  }

  @Patch(':idRolPermiso')
  update(@Param('idRolPermiso') idRolPermiso: number, @Body() updateRolPermisoDto: UpdateRolPermisoDto) {
    return this.rolPermisoService.update(+idRolPermiso, updateRolPermisoDto);
  }

  @Patch('state/:idRolPermiso')
  status(@Param('idRolPermiso') idRolPermiso: number) {
    return this.rolPermisoService.changeStatus(+idRolPermiso);
  }
}
