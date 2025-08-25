import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateElementoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  imagen: string;

  @IsNumber()
  @IsOptional()
  fkCategoria: number;

  @IsNumber()
  @IsOptional()
  fkUnidadMedida: number;

  @IsNumber()
  @IsOptional()
  fkCaracteristica?: number;
}
