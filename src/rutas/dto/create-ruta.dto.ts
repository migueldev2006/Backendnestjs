
import { IsBoolean, IsInt, IsString, MinLength } from "class-validator";

export class CreateRutaDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString()
    descripcion : string;

    @IsString()
    urlDestino : string;

    @IsBoolean()
    estado: boolean;

    @IsInt()
    fkModulo: number;
}
