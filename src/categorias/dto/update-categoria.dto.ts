import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(4)
    nombre: string;
}
