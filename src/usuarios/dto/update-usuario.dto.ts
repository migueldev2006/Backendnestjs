import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(OmitType(CreateUsuarioDto, ['fkRol'] as const)) {

    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString({ message: "El apellido debe ser un string" })
    @MinLength(5)
    apellido: string;

    @IsNumber()
    edad: number;

    @IsString()
    @MinLength(10)
    telefono: string;

    @IsString()
    @MinLength(10)
    correo: string;

    @IsString()
    @MinLength(20)
    perfil: string;
}
