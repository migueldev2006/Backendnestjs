import { IsBoolean, IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsInt()
    @IsPositive()
    @Min(10)
    documento: number;

    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString({ message: "El apellido debe ser un string" })
    @MinLength(5)
    apellido: string;

    @IsNumber()
    edad: number

    @IsString()
    @MinLength(10)
    telefono: string;

    @IsString()
    @MinLength(10)
    correo: string;

    @IsBoolean()
    estado: boolean;

    @IsString()
    @MinLength(6)
    cargo: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsString()
    @MinLength(20)
    perfil: string;

    @IsInt()
    fkrol:number;
}
