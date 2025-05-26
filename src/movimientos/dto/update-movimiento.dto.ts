import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoDto } from './create-movimiento.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovimientoDto extends PartialType(CreateMovimientoDto) {
  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  @IsOptional()
  cantidad: number;

  @IsString()
  @IsOptional()
  horaIngreso: string;

  @IsString()
  @IsOptional()
  horaSalida: string;

  @IsString()
  @IsOptional()
  fechaDevolucion: string;
}
