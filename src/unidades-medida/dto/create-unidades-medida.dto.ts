import { IsBoolean, IsString } from "class-validator";

export class CreateUnidadesMedidaDto {
    @IsString()
    nombre:string

    @IsBoolean()
    estado:boolean
}
