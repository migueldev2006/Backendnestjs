import { PartialType } from '@nestjs/mapped-types';
import { CreateRutaDto } from './create-ruta.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateRutaDto extends PartialType(CreateRutaDto) {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString()
    descripcion: string;
}