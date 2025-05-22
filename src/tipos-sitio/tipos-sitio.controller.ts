import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TiposSitioService } from './tipos-sitio.service';
import { CreateTiposSitioDto } from './dto/create-tipos-sitio.dto';
import { UpdateTiposSitioDto } from './dto/update-tipos-sitio.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Controller('tipos_sitio')
export class TiposSitioController {
  constructor(private readonly tiposSitioService: TiposSitioService) {}

  @Post()
  async create(@Body() newTipoSitio: CreateTiposSitioDto) {
    return this.tiposSitioService.create(newTipoSitio);
  }

  @Get()
  findAll() {
    return this.tiposSitioService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.tiposSitioService.findOne(nombre);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTiposSitio: UpdateTiposSitioDto) {
    return this.tiposSitioService.update(+id, updateTiposSitio);
  }
  @Patch('estado/:id')
 updatestat(@Param('id') id: string) {
    return this.tiposSitioService.updatestate(+id);
  }

}
