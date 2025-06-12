import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/usuarios/email/email.service';
@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>,
        private emailService: EmailService
        
    ) { }

    async login(data: LoginDto) {
        const user = await this.usuarioRepository.findOne({
            where: {
                documento: data.documento
            },
            relations: ["fkRol"]
        });
        if (!user) throw new HttpException("Usuario no existe", HttpStatus.NOT_FOUND)

        const verified = await bcrypt.compare(data.password, user.password);
        if (!verified) throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);

        const token = jwt.sign({
            ...user,
            password: undefined,
            fkRol: user.fkRol?.idRol ?? undefined
        }, this.configService.get("SECRET"), {
            expiresIn: this.configService.get("EXPIRES") ?? "1h"
        });

        return { status: 200, response: "Successfully logged in", access_token: token }
    }

    async forgotPassword(correo : string) : Promise <void>{
        const user = this.usuarioRepository.findOneBy({correo})

        if(!user){
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        await this.emailService.sendResetPasswordLink(correo);
    }


    async resetPassword(token:string,password:string):Promise<void>{
        const correo = await this.emailService.decodeConfirmationToken(token);


        const user = await this.usuarioRepository.findOneBy({correo})

        if(!user){
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        user.password = password;
    }


  
}
