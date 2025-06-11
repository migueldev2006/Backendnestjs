import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateInventarioDto {
    @IsNumber()
    stock:number

    @IsBoolean()
    estado:boolean

    @IsString()
    slug:string

    @IsNumber()
    fkElemento:number

    @IsNumber()
    fkSitio:number

    
}
