import { IsBoolean, IsInt, IsString, MinLength } from "class-validator";

export class CreateModuloDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString()
    descripcion: string;

    @IsBoolean()
    estado: boolean;
}
