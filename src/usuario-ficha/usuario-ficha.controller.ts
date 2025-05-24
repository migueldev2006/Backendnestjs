import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioFichaService } from './usuario-ficha.service';
import { CreateUsuarioFichaDto, UpdateUsuarioFichaDto } from './dto';

@Controller('usuario-ficha')
export class UsuarioFichaController {
  constructor(private readonly usuarioFichaService: UsuarioFichaService) {}

  @Post()
  create(@Body() createUsuarioFichaDto: CreateUsuarioFichaDto) {
    return this.usuarioFichaService.create(createUsuarioFichaDto);
  }

  @Get()
  findAll() {
    return this.usuarioFichaService.findAll();
  }

  @Get(':idUsuarioFicha')
  findOne(@Param('idUsuarioFicha') idUsuarioFicha: string) {
    return this.usuarioFichaService.findOne(+idUsuarioFicha);
  }

  @Patch(':idUsuarioFicha')
  update(@Param('idUsuarioFicha') idUsuarioFicha: string, @Body() updateUsuarioFichaDto: UpdateUsuarioFichaDto) {
    return this.usuarioFichaService.update(+idUsuarioFicha, updateUsuarioFichaDto);
  }

}
