import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { AgregarStockDto, CreateInventarioDto, UpdateInventarioDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';

@UseGuards(JwtGuard, PermisoGuard)
@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Post()
  @Permiso(34)
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Post('agregateStock')
  @Permiso(35)
  agregateStock(@Body() agregateStockDto: AgregarStockDto) {
    return this.inventariosService.agregateStock(agregateStockDto);
  }

  @Get()
  @Permiso(36)
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get(':idInventario')
  @Permiso(37)
  findOne(@Param('idInventario') idInventario: number) {
    return this.inventariosService.findOne(+idInventario);
  }

  @Patch(':idInventario')
  @Permiso(38)
  update(@Param('idInventario') idInventario: number, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventariosService.update(+idInventario, updateInventarioDto);
  }

  @Patch('state/:idInventario')
  @Permiso(39)
  stastus(@Param('idInventario') idInventario: number) {
    return this.inventariosService.changeStatus(+idInventario);
  }

}
