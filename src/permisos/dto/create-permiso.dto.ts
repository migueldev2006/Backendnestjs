import { IsNotEmpty, IsString } from "class-validator";

export class CreatePermisoDto {
    @IsString()
    @IsNotEmpty()
    permiso:string
}
