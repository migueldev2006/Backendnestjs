import { PartialType } from '@nestjs/mapped-types';
import { CreateElementoDto } from './create-elemento.dto';
// import { ElementImage } from '../entities';
import { IsArray, IsOptional, IsString } from 'class-validator';

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
