import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateElementoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsBoolean()
  perecedero: boolean;

  @IsBoolean()
  noPerecedero: boolean;

  @IsBoolean()
  estado: boolean;

  @IsString()
  @IsOptional()
  fechaVencimiento?:string

  @IsString()
  fechaUso:string

  @IsString()
  imagen:string

  @IsNumber()
  fkCategoria:number

  @IsNumber()
  fkUnidadMedida:number

  @IsNumber()
  @IsOptional()
  fkCaracteristica?:number
}
