import { IsBoolean, IsInt, IsString, MinLength } from "class-validator";

export class CreateCaracteristicaDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString()
    codigo : string;

    @IsInt()
    fkElemento: number;
}
