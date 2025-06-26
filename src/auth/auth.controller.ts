import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { Response } from 'express';
import { resetPasswordDto } from './dto/reset-password.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    login(@Body() data: LoginDto){
        return this.authService.login(data);
    }

    @Post("forgot-password")
    forgotPassword(@Body() {correo}: forgotPasswordDto) {
        return this.authService.forgotPassword(correo);
    }

    @Post("reset-password")
    async resetPassword(
        @Body() {password} : resetPasswordDto,
        @Body() {confirmPassword} : resetPasswordDto,
        @Query('token') token : string
    ) {
        return this.authService.resetPassword(token,password,confirmPassword);
    }
}
