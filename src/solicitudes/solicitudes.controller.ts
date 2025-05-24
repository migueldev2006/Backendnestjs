import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudeDto, UpdateSolicitudeDto } from './dto';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() createSolicitudeDto: CreateSolicitudeDto) {
    return this.solicitudesService.create(createSolicitudeDto);
  }

  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get(':idSolicitud')
  findOne(@Param('idSolicitud') idSolicitud: string) {
    return this.solicitudesService.findOne(+idSolicitud);
  }

  @Patch(':idSolicitud')
  update(@Param('idSolicitud') idSolicitud: string, @Body() updateSolicitudeDto: UpdateSolicitudeDto) {
    return this.solicitudesService.update(+idSolicitud, updateSolicitudeDto);
  }

}
