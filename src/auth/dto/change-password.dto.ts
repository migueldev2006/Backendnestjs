import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    oldPassword: string
}