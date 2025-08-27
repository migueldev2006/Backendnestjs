import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZapatoService } from './zapato.service';
import { CreateZapatoDto, UpdateZapatoDto } from './dto';


@Controller('zapato')
export class ZapatoController {
  constructor(private readonly zapatoService: ZapatoService) {}

  @Post()
  create(@Body() createZapatoDto: CreateZapatoDto) {
    return this.zapatoService.create(createZapatoDto);
  }

  @Get()
  findAll() {
    return this.zapatoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zapatoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZapatoDto: UpdateZapatoDto) {
    return this.zapatoService.update(+id, updateZapatoDto);
  }


}
