import { HttpException, HttpStatus, Injectable, UsePipes } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as XLSX from 'xlsx';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) { }

  async create(newUser: CreateUsuarioDto, filename?: string) {

    const saltRounds = 10;
    const hash = await bcrypt.hash(newUser.password, saltRounds);

    const Usuario = this.usuariosRepository.create({
      ...newUser,
      password: hash,
      perfil: filename ?? "defaultPerfil.png",
      fkRol: { idRol: newUser.fkRol }
    });

    return await this.usuariosRepository.save(Usuario);
  }

  async updateProfilePhoto(userId: number, perfil?: string) {
    await this.usuariosRepository.update(userId, { perfil: perfil });
    const updated = await this.usuariosRepository.findOne({
      where: {
        idUsuario: userId
      },
      select: {
        idUsuario: true,
        documento: true,
        edad: true,
        nombre: true,
        apellido: true,
        telefono: true,
        correo: true,
        perfil: true,
        fkRol: true,
      },
      relations: ["fkRol"]
    });
    return { status: 200, message: "Foto actualizada con exito", updated };
  }

  async getPerfil(id: number) {
    const user = await this.usuariosRepository.findOne({
      where: {
        idUsuario: id
      },
      select: {
        idUsuario: true,
        documento: true,
        edad: true,
        nombre: true,
        apellido: true,
        telefono: true,
        correo: true,
        perfil: true,
        fkRol: true,
      },
      relations: ["fkRol"]
    });
    return { status: 200, message: "Perfil obtenido exitosamente", usuario: user };
  }

  async massiveUpload(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer', codepage: 65001 });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    let newUsersList: Usuarios[] = [];

    for (const row of jsonData) {
      const usuario = row as CreateUsuarioDto;
      const userPass = usuario.nombre.slice(0, 1) + usuario.apellido.slice(0, 1) + usuario.documento;
      const passwordHash = await bcrypt.hash(userPass, 12);
      const createdUser = await this.usuariosRepository.save({
        ...usuario,
        password: passwordHash,
        fkRol: { idRol: usuario.fkRol }
      })
      newUsersList.push(createdUser);
    }
    return { msg: "Users registered successfully", newUsers: newUsersList }
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  async findOne(nombre: string) {
    const usuario = await this.usuariosRepository.findOneBy({ nombre });
    if (!usuario) throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
    return usuario;
  }

  async update(id: number, updateUsuario: UpdateUsuarioDto) {
    const update = await this.usuariosRepository.update(id, updateUsuario);
    const user = this.usuariosRepository.findOne({
      where: {
        idUsuario: id
      }
    })
    return user;
  }

  async updatePerfil(userId: number, updatePerfil: UpdatePerfilDto) {
    if(updatePerfil.password) updatePerfil.password = await bcrypt.hash(updatePerfil.password,10);
     await this.usuariosRepository.update(userId, updatePerfil)
    const updated = await this.usuariosRepository.findOne({
      where: { idUsuario: userId },
    });
    return updated;
  }

  async updatestate(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: {
        idUsuario: id
      }
    });
    if (!usuario) throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
    await this.usuariosRepository.update(id, { estado: !(usuario.estado) })

    return usuario
  }

}
