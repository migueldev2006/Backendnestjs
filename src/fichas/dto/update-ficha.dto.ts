import { PartialType } from '@nestjs/mapped-types';
import { CreateFichaDto } from './create-ficha.dto';
import { IsNumber } from 'class-validator';

export class UpdateFichaDto extends PartialType(CreateFichaDto) {
  @IsNumber()
  codigoFicha: number;
}
