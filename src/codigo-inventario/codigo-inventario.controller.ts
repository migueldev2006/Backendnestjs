import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodigoInventarioService } from './codigo-inventario.service';
import { CreateCodigoInventarioDto } from './dto/create-codigo-inventario.dto';
import { UpdateCodigoInventarioDto } from './dto/update-codigo-inventario.dto';

@Controller('codigo-inventario')
export class CodigoInventarioController {
  constructor(private readonly codigoInventarioService: CodigoInventarioService) {}

  @Post()
  create(@Body() createCodigoInventarioDto: CreateCodigoInventarioDto) {
    return this.codigoInventarioService.create(createCodigoInventarioDto);
  }

  @Get()
  findAll() {
    return this.codigoInventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codigoInventarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodigoInventarioDto: UpdateCodigoInventarioDto) {
    return this.codigoInventarioService.update(+id, updateCodigoInventarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codigoInventarioService.remove(+id);
  }
}
