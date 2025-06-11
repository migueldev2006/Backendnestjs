import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {
    @IsOptional()
    @IsNumber()
    stock?: number;
}
