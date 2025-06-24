import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(2)
  codigoUNPSC: string;

  @IsBoolean()
  estado: boolean;
}
