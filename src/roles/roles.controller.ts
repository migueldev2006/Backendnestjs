import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':idRol')
  findOne(@Param('idRol') idRol: number) {
    return this.rolesService.findOne(+idRol);
  }

  @Patch(':idRol')
  update(@Param('idRol') idRol: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+idRol, updateRoleDto);
  }

  @Patch('/state/:idRol')
  status(@Param('idRol') idRol: number) {
    return this.rolesService.changeStatus(+idRol);
  }
}
