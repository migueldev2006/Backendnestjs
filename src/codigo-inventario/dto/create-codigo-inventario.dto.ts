import {  IsNumber, IsString } from "class-validator";

export class CreateCodigoInventarioDto {
    @IsString()
    codigo:string

    @IsNumber()
    fkInventario:number
}
