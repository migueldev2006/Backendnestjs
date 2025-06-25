import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class forgotPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    correo: string;
}