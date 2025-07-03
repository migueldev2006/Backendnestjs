import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('sitios-mayor-stock')
  async obtenerSitiosConMayorStock() {
    return this.reportesService.sitiosConMayorStock();
  }

  @Get('usuarios-mas-movimientos')
  async obtenerUsuariosConMasMovimientos() {
    return this.reportesService.usuarioConMasMovimientos();
  }

  @Get('elementos-por-caducar')
  async obtenerElementosPorCaducar() {
    return this.reportesService.elementosPorCaducar();
  }

  @Get('historial-movimientos')
  async obtenerHistorialMovimientos(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reportesService.historialDeMovimientos(fechaInicio, fechaFin);
  }
}
