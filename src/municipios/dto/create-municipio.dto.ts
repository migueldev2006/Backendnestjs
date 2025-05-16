
import { IsBoolean, IsString, MinLength } from "class-validator";

export class CreateMunicipioDto {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString({message:"El departamento debe ser string"})
    departamento : string;

    @IsBoolean()
    estado: boolean
}
