import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SitiosService } from './sitios.service';
import { CreateSitioDto, UpdateSitioDto } from './dto';

@Controller('sitios')
export class SitiosController {
  constructor(private readonly sitiosService: SitiosService) {}

  @Post()
  create(@Body() createSitioDto: CreateSitioDto) {
    return this.sitiosService.create(createSitioDto);
  }

  @Get()
  findAll() {
    return this.sitiosService.findAll();
  }

  @Get(':idSitio')
  findOne(@Param('idSitio') idSitio: string) {
    return this.sitiosService.findOne(+idSitio);
  }

  @Patch(':idSitio')
  update(@Param('idSitio') idSitio: string, @Body() updateSitioDto: UpdateSitioDto) {
    return this.sitiosService.update(+idSitio, updateSitioDto);
  }

  @Patch('state/:idSitio')
  status(@Param('idSitio') idSitio: string) {
    return this.sitiosService.changeStatus(+idSitio);
  }
}
