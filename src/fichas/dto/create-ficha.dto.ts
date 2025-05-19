import { IsBoolean, IsNumber } from "class-validator";

export class CreateFichaDto {
    @IsNumber()
    codigoFicha:number

    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkPrograma:number
}
