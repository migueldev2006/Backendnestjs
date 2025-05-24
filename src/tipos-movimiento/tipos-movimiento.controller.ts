import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposMovimientoService } from './tipos-movimiento.service';
import { CreateTiposMovimientoDto, UpdateTiposMovimientoDto } from './dto';

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

  @Get(':idTipo')
  findOne(@Param('idTipo') idTipo: number) {
    return this.tiposMovimientoService.findOne(+idTipo);
  }

  @Patch(':idTipo')
  update(@Param('idTipo') idTipo: number, @Body() updateTiposMovimientoDto: UpdateTiposMovimientoDto) {
    return this.tiposMovimientoService.update(+idTipo, updateTiposMovimientoDto);
  }

  @Patch('state/:idTipo')
  status(@Param('idTipo') idTipo: number) {
    return this.tiposMovimientoService.changeStatus(+idTipo);
  }
}
