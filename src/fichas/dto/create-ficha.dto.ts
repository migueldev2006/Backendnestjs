import { IsBoolean, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateFichaDto {
    @IsNumber()
    codigoFicha:number

    @IsBoolean()
    estado:boolean

    @IsInt()
    fkPrograma:number   
}
