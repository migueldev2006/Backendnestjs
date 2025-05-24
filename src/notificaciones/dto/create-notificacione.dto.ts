import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateNotificacioneDto {
    @IsString()
    titulo:string

    @IsString()
    mensaje:string

    @IsString()
    destino:string

    @IsBoolean()
    leido:boolean

    @IsString()
    slug:string

    @IsNumber()
    fkMovimiento:number

    @IsNumber()
    fkSoicitud:number

}
