import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.categoriasService.findOne(nombre);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCategoria: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoria);
  }

  @Patch('estado/:id')
  remove(@Param('id') id: string) {
    return this.categoriasService.updatestate(+id);
  }
}
