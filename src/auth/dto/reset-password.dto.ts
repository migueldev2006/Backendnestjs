import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class resetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    confirmPassword:string
}
