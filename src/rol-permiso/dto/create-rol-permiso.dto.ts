import { IsBoolean, IsNumber } from "class-validator";

export class CreateRolPermisoDto {
    @IsBoolean()
    estado:boolean

    @IsNumber()
    fkPermiso:number

    @IsNumber()
    fkRol:number
}
