import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FichasService } from './fichas.service';
import { CreateFichaDto, UpdateFichaDto } from './dto';

@Controller('fichas')
export class FichasController {
  constructor(private readonly fichasService: FichasService) {}

  @Post()
  create(@Body() createFichaDto: CreateFichaDto) {
    return this.fichasService.create(createFichaDto);
  }

  @Get()
  findAll() {
    return this.fichasService.findAll();
  }

  @Get(':idFicha')
  findOne(@Param('idFicha') idFicha: string) {
    return this.fichasService.findOne(+idFicha);
  }

  @Patch(':idFicha')
  update(@Param('idFicha') idFicha: string, @Body() updateFichaDto: UpdateFichaDto) {
    return this.fichasService.update(+idFicha, updateFichaDto);
  }

  @Patch('state/:idFicha')
  status(@Param('idFicha') idFicha: string) {
    return this.fichasService.changeStatus(+idFicha);
  }
}
