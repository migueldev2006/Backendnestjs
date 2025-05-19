import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() newUser: CreateUsuarioDto) {
    console.log(newUser);
    return this.usuariosService.create(newUser);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.usuariosService.findOne(nombre);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUsuario: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuario);
  }

 @Patch('estado/:id')
 updatestate(@Param('id') id: string) {
    return this.usuariosService.updatestate(+id);
  }
}
