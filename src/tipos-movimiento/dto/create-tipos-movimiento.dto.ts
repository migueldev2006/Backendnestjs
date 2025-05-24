import { IsBoolean, IsString } from "class-validator";

export class CreateTiposMovimientoDto {
    @IsString()
    nombre:string

    @IsBoolean()
    estado:boolean
}
