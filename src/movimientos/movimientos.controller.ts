import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientosService.create(createMovimientoDto);
  }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':idMovimiento')
  findOne(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.findOne(+idMovimiento);
  }

  @Patch(':idMovimiento')
  update(@Param('idMovimiento') idMovimiento: number, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientosService.update(+idMovimiento, updateMovimientoDto);
  }

  // @Patch('accept/:idMovimiento')
  // accept(@Param('idMovimiento') idMovimiento: number) {
  //   return this.movimientosService.accept(+idMovimiento);
  // }

  // @Patch('cancel/:idMovimiento')
  // cancel(@Param('idMovimiento') idMovimiento: number) {
  //   return this.movimientosService.cancel(+idMovimiento);
  
}
