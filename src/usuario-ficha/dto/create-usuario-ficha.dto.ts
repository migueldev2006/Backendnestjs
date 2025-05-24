import { IsNumber } from "class-validator";

export class CreateUsuarioFichaDto {
    @IsNumber()
    fkFicha:number

    @IsNumber()
    fkUsuario:number
}
