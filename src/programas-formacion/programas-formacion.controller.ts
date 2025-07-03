import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramasFormacionService } from './programas-formacion.service';
import { CreateProgramasFormacionDto, UpdateProgramasFormacionDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('programas-formacion')
export class ProgramasFormacionController {
  constructor(private readonly programasFormacionService: ProgramasFormacionService) { }

  @Post()
  @Permiso(39)
  create(@Body() createProgramasFormacionDto: CreateProgramasFormacionDto) {
    return this.programasFormacionService.create(createProgramasFormacionDto);
  }

  @Get()
  @Permiso(40)
  findAll() {
    return this.programasFormacionService.findAll();
  }

  @Get(':idPrograma')
  findOne(@Param('idPrograma') idPrograma: number) {
    return this.programasFormacionService.findOne(+idPrograma);
  }

  @Patch(':idPrograma')
  @Permiso(41)
  update(@Param('idPrograma') idPrograma: number, @Body() updateProgramasFormacionDto: UpdateProgramasFormacionDto) {
    return this.programasFormacionService.update(+idPrograma, updateProgramasFormacionDto);
  }

  @Patch('state/:idPrograma')
  @Permiso(42)
  status(@Param('idPrograma') idPrograma: number) {
    return this.programasFormacionService.changeStatus(+idPrograma);
  }
}
