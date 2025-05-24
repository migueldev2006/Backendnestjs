import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateSolicitudeDto {
    @IsString()
    descripcion:string

    @IsNumber()
    cantidad:number

    @IsBoolean()
    aceptada:boolean

    @IsBoolean()
    pendiente:boolean

    @IsBoolean()
    rechazada:boolean

    @IsString()
    slug:string

    @IsNumber()
    fkInventario:number

    @IsNumber()
    fkUsuario:number
}
