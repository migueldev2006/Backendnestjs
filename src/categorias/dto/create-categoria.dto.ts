import { IsBoolean, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsBoolean()
    estado: boolean
}
