import { PartialType } from '@nestjs/mapped-types';
import { CreateElementoDto } from './create-elemento.dto';
import { ElementImage } from '../entities';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateElementoDto extends PartialType(CreateElementoDto) {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];
}
