import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  // @Post()
  // @Permiso(32)
  // create(@Body() createMovimientoDto: CreateMovimientoDto) {
  //   return this.movimientosService.create(createMovimientoDto);
  // }

  @Get()
  @Permiso(33)
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':idMovimiento')
  @Permiso(34)
  findOne(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.findOne(+idMovimiento);
  }

  @Patch(':idMovimiento')
  @Permiso(35)
  update(
    @Param('idMovimiento') idMovimiento: number,
    @Body() updateMovimientoDto: UpdateMovimientoDto,
  ) {
    return this.movimientosService.update(+idMovimiento, updateMovimientoDto);
  }

  @Patch('accept/:idMovimiento')
  @Permiso(36)
  accept(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.accept(+idMovimiento);
  }

  @Patch('cancel/:idMovimiento')
  @Permiso(37)
  cancel(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.cancel(+idMovimiento);
  }
}
