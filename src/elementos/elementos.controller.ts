import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { CreateElementoDto, UpdateElementoDto } from './dto';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
@UseGuards(JwtGuard)
@UseGuards(PermisoGuard)
@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) {}

  @Post()
  @Permiso(27)
  create(@Body() createElementoDto: CreateElementoDto) {
    return this.elementosService.create(createElementoDto);
  }

  @Get()
  @Permiso(28)
  findAll() {
    return this.elementosService.findAll();
  }

  @Get(':idElemento')
  @Permiso(29)
  findOne(@Param('idElemento') idElemento: number) {
    return this.elementosService.findOne(+idElemento);
  }

  @Patch(':idElemento')
  @Permiso(30)
  update(@Param('idElemento') idElemento: number, @Body() updateElementoDto: UpdateElementoDto) {
    return this.elementosService.update(+idElemento, updateElementoDto);
  }

  @Patch('state/:idElemento')
  @Permiso(31)
  status(@Param('idElemento') idElemento: number) {
    return this.elementosService.changeStatus(+idElemento);
  }
}
