import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TiposSitioService } from './tipos-sitio.service';
import { CreateTiposSitioDto } from './dto/create-tipos-sitio.dto';
import { UpdateTiposSitioDto } from './dto/update-tipos-sitio.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
@UseGuards(JwtGuard)
@Controller('tipos_sitio')
export class TiposSitioController {
  constructor(private readonly tiposSitioService: TiposSitioService) {}

  @Post()
  @Permiso(12)
  @UseGuards(PermisoGuard)
  async create(@Body() newTipoSitio: CreateTiposSitioDto) {
    return this.tiposSitioService.create(newTipoSitio);
  }

  @Get()
  @Permiso(11)
  @UseGuards(PermisoGuard)
  findAll() {
    return this.tiposSitioService.findAll();
  }

  @Get(':nombre')
  @Permiso(13)
  @UseGuards(PermisoGuard)
  findOne(@Param('nombre') nombre: string) {
    return this.tiposSitioService.findOne(nombre);
  }

  @Patch('update/:id')
  @Permiso(14)
  @UseGuards(PermisoGuard)
  update(
    @Param('id') id: string,
    @Body() updateTiposSitio: UpdateTiposSitioDto,
  ) {
    return this.tiposSitioService.update(+id, updateTiposSitio);
  }
  @Patch('estado/:id')
  @Permiso(15)
  @UseGuards(PermisoGuard)
  updatestat(@Param('id') id: string) {
    return this.tiposSitioService.updatestate(+id);
  }
}
