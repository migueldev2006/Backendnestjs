import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProgramasFormacionDto {
    @IsString()
    @IsNotEmpty()
    nombre:string

    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkArea:number
}
