import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSedeDto {
    @IsString()
    @IsNotEmpty()
    nombre:string

    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkCentro:number
}
