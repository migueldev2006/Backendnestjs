import { PartialType } from '@nestjs/mapped-types';
import { CreateModuloDto } from './create-modulo.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateModuloDto extends PartialType(CreateModuloDto) {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString()
    descripcion: string;
}
