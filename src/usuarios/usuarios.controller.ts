import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';

@UseGuards(JwtGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @Permiso(2)
  @UseGuards(PermisoGuard)
  async create(@Body() newUser: CreateUsuarioDto) {
    return this.usuariosService.create(newUser);
  }

  @Get()
  @Permiso(1) //id del permiso
  @UseGuards(PermisoGuard) // ve si quien lo pide esta autorizado
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':nombre')
  @Permiso(3)
  @UseGuards(PermisoGuard)
  findOne(@Param('nombre') nombre: string) {
    return this.usuariosService.findOne(nombre);
  }

  @Patch('update/:id')
  @Permiso(4)
  @UseGuards(PermisoGuard)
  update(@Param('id') id: string, @Body() updateUsuario: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuario);
  }

  @Patch('estado/:id')
  @Permiso(5)
  @UseGuards(PermisoGuard)
  updatestate(@Param('id') id: string) {
    return this.usuariosService.updatestate(+id);
  }
}
