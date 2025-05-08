import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';

@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) {}

  @Post()
  create(@Body() createElementoDto: CreateElementoDto) {
    return this.elementosService.create(createElementoDto);
  }

  @Get()
  findAll() {
    return this.elementosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementoDto: UpdateElementoDto) {
    return this.elementosService.update(+id, updateElementoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementosService.remove(+id);
  }
}
