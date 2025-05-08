import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramasFormacionService } from './programas-formacion.service';
import { CreateProgramasFormacionDto } from './dto/create-programas-formacion.dto';
import { UpdateProgramasFormacionDto } from './dto/update-programas-formacion.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programasFormacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramasFormacionDto: UpdateProgramasFormacionDto) {
    return this.programasFormacionService.update(+id, updateProgramasFormacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programasFormacionService.remove(+id);
  }
}
