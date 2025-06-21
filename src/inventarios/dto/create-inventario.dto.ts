import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateInventarioDto {
    @IsNumber()
    stock:number

    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkElemento:number

    @IsNumber()
    fkSitio:number

    
}
