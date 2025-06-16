import { IsBoolean, IsString } from "class-validator";

export class CreateUnidadesMedidaDto {
    @IsString({message:"El nombre debe ser un string"})
    nombre:string

    @IsBoolean({message:"El estado debe ser un boleano"})
    estado:boolean
}
