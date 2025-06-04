import { PartialType } from '@nestjs/mapped-types';
import { CreateFichaDto } from './create-ficha.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateFichaDto extends PartialType(CreateFichaDto) {
  @IsNumber()
  @IsOptional()
  codigoFicha: number;
}
