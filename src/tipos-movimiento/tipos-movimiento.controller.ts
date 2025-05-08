import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposMovimientoService } from './tipos-movimiento.service';
import { CreateTiposMovimientoDto } from './dto/create-tipos-movimiento.dto';
import { UpdateTiposMovimientoDto } from './dto/update-tipos-movimiento.dto';

@Controller('tipos-movimiento')
export class TiposMovimientoController {
  constructor(private readonly tiposMovimientoService: TiposMovimientoService) {}

  @Post()
  create(@Body() createTiposMovimientoDto: CreateTiposMovimientoDto) {
    return this.tiposMovimientoService.create(createTiposMovimientoDto);
  }

  @Get()
  findAll() {
    return this.tiposMovimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposMovimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposMovimientoDto: UpdateTiposMovimientoDto) {
    return this.tiposMovimientoService.update(+id, updateTiposMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposMovimientoService.remove(+id);
  }
}
