import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateElementoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  valor: number;

  @IsBoolean()
  perecedero: boolean;

  @IsBoolean()
  noPerecedero: boolean;

  @IsBoolean()
  estado: boolean;

  @IsDate()
  @IsOptional()
  fechaVencimiento?:string

  @IsDate()
  @IsOptional()
  fechaUso?:string

  @IsArray()
  @IsString({each:true})
  images: string[];

  @IsNumber()
  fkCategoria:number

  @IsNumber()
  fkUnidadMedida:number
}
