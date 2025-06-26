import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CodigoInventarioService } from './codigo-inventario.service';
import { CreateCodigoInventarioDto, UpdateCodigoInventarioDto } from './dto'
import { JwtGuard } from 'src/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
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

  @Get(':idCodigoInventario')
  findOne(@Param('idCodigoInventario') idCodigoInventario: string) {
    return this.codigoInventarioService.findOne(+idCodigoInventario);
  }

  @Patch(':idCodigoInventario')
  update(@Param('idCodigoInventario') idCodigoInventario: string, @Body() updateCodigoInventarioDto: UpdateCodigoInventarioDto) {
    return this.codigoInventarioService.update(+idCodigoInventario, updateCodigoInventarioDto);
  }

}
