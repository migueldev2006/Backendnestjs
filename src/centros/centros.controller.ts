import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
@UseGuards(JwtGuard)
@Controller('centros')
export class CentrosController {
  constructor(private readonly centrosService: CentrosService) { }

  @Post()
  @Permiso(7)
  @UseGuards(PermisoGuard)
  create(@Body() createCentroDto: CreateCentroDto) {
    return this.centrosService.create(createCentroDto);
  }

  @Get()
  @Permiso(6)
  @UseGuards(PermisoGuard)
  findAll() {
    return this.centrosService.findAll();
  }

  @Get(':id')
  @Permiso(8)
  @UseGuards(PermisoGuard)
  findOne(@Param('id') id: string) {
    return this.centrosService.findOne(+id);
  }

  @Patch('update/:id')
  @Permiso(9)
  @UseGuards(PermisoGuard)
  update(@Param('id') id: string, @Body() updateCentroDto: UpdateCentroDto) {
    return this.centrosService.update(+id, updateCentroDto);
  }

  @Patch('estado/:id')
  @Permiso(10)
  @UseGuards(PermisoGuard)
  updateStatus(@Param('id') id: string) {
    return this.centrosService.updateStatus(+id);
  }

}
