import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FichasService } from './fichas.service';
import { CreateFichaDto, UpdateFichaDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('fichas')
export class FichasController {
  constructor(private readonly fichasService: FichasService) {}

  @Post()
  @Permiso(6)
  create(@Body() createFichaDto: CreateFichaDto) {
    return this.fichasService.create(createFichaDto);
  }

  @Get()
  @Permiso(7)
  findAll() {
    return this.fichasService.findAll();
  }

  @Get(':idFicha')
  findOne(@Param('idFicha') idFicha: string) {
    return this.fichasService.findOne(+idFicha);
  }

  @Patch(':idFicha')
  @Permiso(8)
  update(@Param('idFicha') idFicha: string, @Body() updateFichaDto: UpdateFichaDto) {
    return this.fichasService.update(+idFicha, updateFichaDto);
  }

  @Patch('state/:idFicha')
  @Permiso(9)
  status(@Param('idFicha') idFicha: string) {
    return this.fichasService.changeStatus(+idFicha);
  }
}
