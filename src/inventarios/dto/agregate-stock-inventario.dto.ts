import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class AgregarStockDto {
  @IsNumber()
  fkElemento: number;

  @IsNumber()
  fkSitio: number;

  @IsOptional()
  @IsArray()
  codigos?: string[];

  @IsOptional()
  @IsNumber()
  stock?: number;
}
