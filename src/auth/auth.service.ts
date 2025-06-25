import { Injectable, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/auth/email/email.service';
import { groupBy } from "lodash";



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
        expiresIn: this.configService.get("EXPIRES") ?? "96h"
    });

    const flatData = await this.usuarioRepository
        .createQueryBuilder("usuario")
        .leftJoin("usuario.fkRol", "rol")
        .leftJoin("rol.rolPermisos", "rolPermiso")
        .leftJoin("rolPermiso.fkPermiso", "permiso")
        .leftJoin("permiso.fkRuta", "ruta")
        .leftJoin("ruta.fkModulo", "modulo")
        .select([
            "modulo.idModulo",
            "modulo.nombre",
            "modulo.icono",
            "modulo.href",
            "ruta.idRuta",
            "ruta.nombre",
            "ruta.href",
            "ruta.icono",
        ])
        .where("usuario.idUsuario = :userId", { userId: user.idUsuario })
        .andWhere("rolPermiso.estado = true")
        .andWhere("ruta.estado = true")
        .andWhere("modulo.estado = true")
        .getRawMany();

        // Group and transform
    const grouped = Object.values(
        flatData.reduce((acc, row) => {
            const moduloId = row.modulo_id_modulo;

            if (!acc[moduloId]) {
                acc[moduloId] = {
                    id: moduloId,
                    nombre: row.modulo_nombre,
                    icono: row.modulo_icono,
                    href: row.modulo_href,
                    rutas: [],
                };
            }

            // Only add route if it doesn't already exist
            const routeExists = acc[moduloId].rutas.some(ruta => ruta.id === row.ruta_id_ruta);
            if (!routeExists) {
                acc[moduloId].rutas.push({
                    id: row.ruta_id_ruta,
                    nombre: row.ruta_nombre,
                    href: row.ruta_href,
                    icono: row.ruta_icono,
                });
            }

            return acc;
        }, {} as Record<number, any>)
    );

    return { status: 200, response: "Successfully logged in", access_token: token, modules: grouped }
}

    async forgotPassword(correo: string) {
        const user = await this.usuarioRepository.findOneBy({ correo })

        if (!user) {
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        this.emailService.sendResetPasswordLink(correo);

        return { status: 200, message: "Revisa tu correo" }
    }


    async resetPassword(token: string, password: string, confirmPassword: string) {

        if (password !== confirmPassword) {
            throw new HttpException(
                'Las contraseñas no coinciden',
                HttpStatus.BAD_REQUEST,
            );
        }

        const correo = await this.emailService.decodeConfirmationToken(token);



        const rounds = 10;
        const newPassword = await bcrypt.hash(password, rounds)

        const user = await this.usuarioRepository.findOneBy({ correo })

        if (!user) {
            throw new HttpException(`No se encontro ningun usuario con el correo ${correo}`, HttpStatus.NOT_FOUND)
        }

        user.password = newPassword;
        await this.usuarioRepository.save(user);

        return { status: 200, message: "Contraseña actualizada correctamente" }
    }



}
