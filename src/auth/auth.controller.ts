import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { resetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    login(@Body() data: LoginDto){
        return this.authService.login(data);
    }

    @Post("forgot-password")
    forgotPassword(@Body() {correo}: resetPasswordDto) {
        return this.authService.forgotPassword(correo);
    }

    @Post("reset-password")
    async resetPassword(@Body() {token, password} : {token:string,password:string}) {
        return this.authService.resetPassword(token,password);
    }
}
