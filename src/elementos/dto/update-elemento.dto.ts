import { IsOptional, IsString } from 'class-validator';

export class UpdateElementoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  imagen: string;
}
