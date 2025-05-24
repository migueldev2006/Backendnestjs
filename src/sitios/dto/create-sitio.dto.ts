import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSitioDto {
    @IsString()
    @IsNotEmpty()
    nombre:string

    @IsString()
    @IsNotEmpty()
    personaEncargada:string

    @IsString()
    @IsNotEmpty()
    ubicacion:string

    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkArea:number

    @IsNumber()
    fkTipoSitio:number
}
