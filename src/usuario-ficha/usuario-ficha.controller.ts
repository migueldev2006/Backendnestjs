import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioFichaService } from './usuario-ficha.service';
import { CreateUsuarioFichaDto } from './dto/create-usuario-ficha.dto';
import { UpdateUsuarioFichaDto } from './dto/update-usuario-ficha.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioFichaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioFichaDto: UpdateUsuarioFichaDto) {
    return this.usuarioFichaService.update(+id, updateUsuarioFichaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioFichaService.remove(+id);
  }
}
