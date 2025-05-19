import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAreaDto {
    @IsString()
    @IsNotEmpty()
    nombre:string

    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkSede:number

    @IsNumber()
    fkUsuario:number
}
