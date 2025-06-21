import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';

@UseGuards(JwtGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() newUser: CreateUsuarioDto) {
    return this.usuariosService.create(newUser);
  }

  @Post('/massive')
  @UseInterceptors(FileInterceptor('excel'))
  async massiveUpload(@UploadedFile() file: Express.Multer.File) {
    return this.usuariosService.massiveUpload(file);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':nombre')
  @Permiso(3)
  // @UseGuards(PermisoGuard)
  findOne(@Param('nombre') nombre: string) {
    return this.usuariosService.findOne(nombre);
  }

  @Patch('update/:idUsuario')
  @Permiso(4)
  // @UseGuards(PermisoGuard)
  update(@Param('idUsuario') idUsuario: string, @Body() updateUsuario: UpdateUsuarioDto) {
    return this.usuariosService.update(+idUsuario, updateUsuario);
  }

  @Patch('estado/:idUsuario')
  @Permiso(5)
  // @UseGuards(PermisoGuard)
  updatestate(@Param('idUsuario') idUsuario: string) {
    return this.usuariosService.updatestate(+idUsuario);
  }
}
