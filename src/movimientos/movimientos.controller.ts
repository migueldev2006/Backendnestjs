import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Permiso } from 'src/auth/decorators/permiso.decorator';
import { RequestWithUser } from 'src/common/interfaces/request-with-user';
@UseGuards(JwtGuard, PermisoGuard)
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}



@Post()
@Permiso(22)
create(@Req() req: RequestWithUser , @Body() createMovimientoDto: CreateMovimientoDto) {
  const idUsuario = req.user?.id; 
  return this.movimientosService.create(createMovimientoDto, idUsuario);
}

  @Get()
  @Permiso(23)
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':idMovimiento')
  findOne(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.findOne(+idMovimiento);
  }

  @Patch(':idMovimiento')
  @Permiso(24)
  update(
    @Param('idMovimiento') idMovimiento: number,
    @Body() updateMovimientoDto: UpdateMovimientoDto,
  ) {
    return this.movimientosService.update(+idMovimiento, updateMovimientoDto);
  }

  @Patch('accept/:idMovimiento')
  @Permiso(25)
  accept(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.accept(+idMovimiento);
  }

  @Patch('cancel/:idMovimiento')
  @Permiso(26)
  cancel(@Param('idMovimiento') idMovimiento: number) {
    return this.movimientosService.cancel(+idMovimiento);
  }
}
