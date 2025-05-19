import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';

@Controller('centros')
export class CentrosController {
  constructor(private readonly centrosService: CentrosService) {}

  @Post()
  create(@Body() createCentroDto: CreateCentroDto) {
    return this.centrosService.create(createCentroDto);
  }

  @Get()
  findAll() {
    return this.centrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centrosService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCentroDto: UpdateCentroDto) {
    return this.centrosService.update(+id, updateCentroDto);
  }

  @Patch('estado/:id')
  updateStatus(@Param('id') id: string) {
    return this.centrosService.updateStatus(+id);
  }

}
