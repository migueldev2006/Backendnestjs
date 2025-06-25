import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SitiosService } from './sitios.service';
import { CreateSitioDto, UpdateSitioDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
@UseGuards(JwtGuard)
@UseGuards(PermisoGuard)
@Controller('sitios')
export class SitiosController {
  constructor(private readonly sitiosService: SitiosService) {}

  @Post()
  @Permiso(18)
  create(@Body() createSitioDto: CreateSitioDto) {
    return this.sitiosService.create(createSitioDto);
  }

  @Get()
  @Permiso(19)
  findAll() {
    return this.sitiosService.findAll();
  }

  @Get(':idSitio')
  @Permiso(20)
  findOne(@Param('idSitio') idSitio: string) {
    return this.sitiosService.findOne(+idSitio);
  }

  @Patch(':idSitio')
  @Permiso(21)
  update(@Param('idSitio') idSitio: string, @Body() updateSitioDto: UpdateSitioDto) {
    return this.sitiosService.update(+idSitio, updateSitioDto);
  }

  @Patch('state/:idSitio')
  @Permiso(22)
  status(@Param('idSitio') idSitio: string) {
    return this.sitiosService.changeStatus(+idSitio);
  }
}
