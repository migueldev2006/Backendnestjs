import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto, UpdateInventarioDto } from './dto';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Post()
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Get()
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get(':idInventario')
  findOne(@Param('idInventario') idInventario: number) {
    return this.inventariosService.findOne(+idInventario);
  }

  @Patch(':idInventario')
  update(@Param('idInventario') idInventario: number, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventariosService.update(+idInventario, updateInventarioDto);
  }

  @Patch('state/:idInventario')
  stastus(@Param('idInventario') idInventario: number) {
    return this.inventariosService.changeStatus(+idInventario);
  }
}
