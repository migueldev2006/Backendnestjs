import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposSitioService } from './tipos-sitio.service';
import { CreateTiposSitioDto } from './dto/create-tipos-sitio.dto';
import { UpdateTiposSitioDto } from './dto/update-tipos-sitio.dto';

@Controller('tipos-sitio')
export class TiposSitioController {
  constructor(private readonly tiposSitioService: TiposSitioService) {}

  @Post()
  create(@Body() createTiposSitioDto: CreateTiposSitioDto) {
    return this.tiposSitioService.create(createTiposSitioDto);
  }

  @Get()
  findAll() {
    return this.tiposSitioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposSitioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposSitioDto: UpdateTiposSitioDto) {
    return this.tiposSitioService.update(+id, updateTiposSitioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposSitioService.remove(+id);
  }
}
