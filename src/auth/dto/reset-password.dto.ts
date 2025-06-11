import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class resetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    correo: string;
}