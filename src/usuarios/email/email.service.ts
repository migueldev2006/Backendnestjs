import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from 'jsonwebtoken';
import { Usuarios } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';



@Injectable()

export class EmailService {
    private nodemailerTransport: Transporter;

    private readonly logger = new Logger(EmailService.name);

    constructor(

        private readonly configService: ConfigService,
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>
    ) {
        this.nodemailerTransport = createTransport({
            service: this.configService.get<string>('SERVICE_MAIL'),
            auth: {
                user: configService.get('MAIL_USER'),
                pass: configService.get('MAIL_PASSWORD')
            }
        })
    }


    private sendMail(options: SendMailOptions) {
        this.logger.log('Email sent out to', options.to);
        return this.nodemailerTransport.sendMail(options);
    }


    async sendResetPasswordLink(correo: string): Promise<void> {

        const user = this.usuarioRepository.findOne({
            where: { correo }
        });

        if (!user) {
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        const payload = { correo };

        const token = jwt.sign(payload, {
            secret: this.configService.get("SECRET"),
            expiresIn: this.configService.get("EXPIRES") ?? "20s"
        });



        const url = `${this.configService.get("EMAIL_RESET_PASSWORD_URL")}?token=${token}`;

        const text = `Holis para cambiar tu contraseña da click aqui: ${url}`;


        return this.sendMail({
            to: correo,
            subject: 'Reset password',
            text
        });

    }

    async decodeConfirmationToken(token: string) {
        try {
            const payload = await jwt.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET')
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException(
                    'Email confirmation token expired'
                );
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }
}