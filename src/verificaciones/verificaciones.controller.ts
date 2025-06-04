import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificacionesService } from './verificaciones.service';
import { CreateVerificacioneDto } from './dto/create-verificacione.dto';
import { UpdateVerificacioneDto } from './dto/update-verificacione.dto';

@Controller('verificaciones')
export class VerificacionesController {
  constructor(private readonly verificacionesService: VerificacionesService) {}

  @Post()
  create(@Body() createVerificacioneDto: CreateVerificacioneDto) {
    return this.verificacionesService.create(createVerificacioneDto);
  }

  @Get()
  findAll() {
    return this.verificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerificacioneDto: UpdateVerificacioneDto) {
    return this.verificacionesService.update(+id, updateVerificacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificacionesService.remove(+id);
  }
}
