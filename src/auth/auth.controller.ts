import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { JwtGuard } from './guards/jwt.guard';
import { resetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("login")
    login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }


}
