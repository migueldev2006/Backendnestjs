import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramasFormacionService } from './programas-formacion.service';
import { CreateProgramasFormacionDto, UpdateProgramasFormacionDto } from './dto';

@Controller('programas-formacion')
export class ProgramasFormacionController {
  constructor(private readonly programasFormacionService: ProgramasFormacionService) {}

  @Post()
  create(@Body() createProgramasFormacionDto: CreateProgramasFormacionDto) {
    return this.programasFormacionService.create(createProgramasFormacionDto);
  }

  @Get()
  findAll() {
    return this.programasFormacionService.findAll();
  }

  @Get(':idPrograma')
  findOne(@Param('idPrograma') idPrograma: number) {
    return this.programasFormacionService.findOne(+idPrograma);
  }

  @Patch(':idPrograma')
  update(@Param('idPrograma') idPrograma: number, @Body() updateProgramasFormacionDto: UpdateProgramasFormacionDto) {
    return this.programasFormacionService.update(+idPrograma, updateProgramasFormacionDto);
  }

  @Patch('state/:idPrograma')
  status(@Param('idPrograma') idPrograma: number) {
    return this.programasFormacionService.changeStatus(+idPrograma);
  }
}
