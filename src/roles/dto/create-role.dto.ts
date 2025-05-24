import { IsBoolean, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    nombre:string

    @IsBoolean()
    estado:boolean

}
