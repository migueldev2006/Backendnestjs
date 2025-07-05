import { IsBoolean, IsInt, IsString, MinLength } from "class-validator";

export class CreateCentroDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(3)
    nombre: string;

    @IsBoolean()
    estado: boolean

    @IsInt()
    fkMunicipio: number;
    
}
