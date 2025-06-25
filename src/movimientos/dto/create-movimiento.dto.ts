import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsDate()
  fechaDevolucion: Date;

  @IsNumber()
  fkInventario: number;

  @IsNumber()
  fkSitio: number;

  @IsNumber()
  fkTipoMovimiento: number;

  @IsNumber()
  fkUsuario: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  codigos?: string[];
}
