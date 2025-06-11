import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
@UseGuards(JwtGuard)
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) { }

  @Post()
  @Permiso(17)
  @UseGuards(PermisoGuard)
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipiosService.create(createMunicipioDto);
  }

  @Get()
  @Permiso(16)
  @UseGuards(PermisoGuard)
  findAll() {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  @Permiso(18)
  @UseGuards(PermisoGuard)
  findOne(@Param('id') id: string) {
    return this.municipiosService.findOne(+id);
  }

  @Patch('update/:id')
  @Permiso(19)
  @UseGuards(PermisoGuard)
  update(@Param('id') id: string, @Body() updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipiosService.update(+id, updateMunicipioDto);
  }

  @Patch('estado/:id')
  @Permiso(20)
  @UseGuards(PermisoGuard)
  updateStatus(@Param('id') id: string) {
    return this.municipiosService.updateStatus(+id);
  }
}
