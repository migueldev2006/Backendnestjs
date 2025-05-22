import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class LoginDto {
    @IsNumber()
    @Min(0)
    @IsPositive()
    @IsNotEmpty()
    documento: number;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}