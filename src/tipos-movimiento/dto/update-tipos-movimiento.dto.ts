import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposMovimientoDto } from './create-tipos-movimiento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTiposMovimientoDto extends PartialType(
  CreateTiposMovimientoDto,
) {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
