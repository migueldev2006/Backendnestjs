import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { CreateElementoDto, UpdateElementoDto } from './dto';

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

  @Get(':idElemento')
  findOne(@Param('idElemento') idElemento: number) {
    return this.elementosService.findOne(+idElemento);
  }

  @Patch(':idElemento')
  update(@Param('idElemento') idElemento: number, @Body() updateElementoDto: UpdateElementoDto) {
    return this.elementosService.update(+idElemento, updateElementoDto);
  }

  @Patch('state/:idElemento')
  status(@Param('idElemento') idElemento: number) {
    return this.elementosService.changeStatus(+idElemento);
  }
}
