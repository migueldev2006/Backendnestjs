import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { CreateSedeDto, UpdateSedeDto } from './dto';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Post()
  create(@Body() createSedeDto: CreateSedeDto) {
    return this.sedesService.create(createSedeDto);
  }

  @Get()
  findAll() {
    return this.sedesService.findAll();
  }

  @Get(':idSede')
  findOne(@Param('idSede') idSede: number) {
    return this.sedesService.findOne(+idSede);
  }

  @Patch(':idSede')
  update(@Param('idSede') idSede: number, @Body() updateSedeDto: UpdateSedeDto) {
    return this.sedesService.update(+idSede, updateSedeDto);
  }

  @Patch('state/:idSede')
  status(@Param('idSede') idSede: number) {
    return this.sedesService.changeStatus(+idSede);
  }
}
