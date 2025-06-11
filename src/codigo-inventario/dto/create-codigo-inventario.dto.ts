import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCodigoInventarioDto {
    @IsString()
    codigo:string

    @IsBoolean()
    uso:boolean

    @IsNumber()
    fkInventario:number
}
