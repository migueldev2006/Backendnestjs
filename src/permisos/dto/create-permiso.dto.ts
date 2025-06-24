import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePermisoDto {
    @IsString()
    @IsNotEmpty()
    permiso:string

    @IsNumber()
    fkModulo:number
}
