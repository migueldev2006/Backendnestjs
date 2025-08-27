import { IsString } from "class-validator";

export class CreateZapatoDto {
    @IsString()
    nombre:string

    @IsString()
    marca:string

    @IsString()
    talla:string

}
