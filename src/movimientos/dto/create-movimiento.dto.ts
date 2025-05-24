import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovimientoDto {
  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  cantidad: number;

  @IsString()
  horaIngreso: string;

  @IsString()
  horaSalida: string;

  @IsBoolean()
  aceptado: boolean;

  @IsBoolean()
  enProceso: boolean;

  @IsBoolean()
  cancelado: boolean;

  @IsBoolean()
  devolutivo: boolean;

  @IsBoolean()
  noDevolutivo: boolean;

  @IsString()
  fechaDevolucion: string;

  @IsString()
  slug: string;

  @IsNumber()
  fkInventario: number;

  @IsNumber()
  fkSitio: number;

  @IsNumber()
  fkTipoMovimiento: number;

  @IsNumber()
  fkUsuario: number;
}
