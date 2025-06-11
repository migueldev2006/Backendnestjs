import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  create(@Body() newRuta: CreateRutaDto) {
    return this.rutasService.create(newRuta);
  }

  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.rutasService.findOne(nombre);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRutaDto: UpdateRutaDto) {
    return this.rutasService.update(+id, updateRutaDto);
  }

  @Patch('estado/:id')
  updatestate(@Param('id') id: string) {
    return this.rutasService.updatestate(+id);
  }
}
