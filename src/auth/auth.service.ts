import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>
    ){}

    async login( data: LoginDto){
        const user = await this.usuarioRepository.findOne({
            where: {
                documento: data.documento
            },
            relations: ["fkRol"]
        });
        if(!user) throw new HttpException("Usuario no existe",HttpStatus.NOT_FOUND)

        const verified = await bcrypt.compare(data.password,user.password);
        if(!verified) throw new HttpException("Wrong password",HttpStatus.UNAUTHORIZED);

        const token = jwt.sign({
            ...user,
            password: undefined,
            fkRol: user.fkRol?.idRol ?? undefined
        },this.configService.get("SECRET"),{
            expiresIn: this.configService.get("EXPIRES") ?? "1h"
        });

        return {status: 200, response: "Successfully logged in", access_token: token}
    }
}
