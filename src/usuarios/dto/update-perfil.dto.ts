import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePerfilDto  {

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
    @IsOptional()
    password:string

}
