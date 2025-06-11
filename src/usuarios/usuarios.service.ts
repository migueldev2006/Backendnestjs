import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ){}

  async create(newUser: CreateUsuarioDto) {
    
    const saltRounds = 10;
    const hash = await bcrypt.hash(newUser.password, saltRounds);

    const Usuario = this.usuariosRepository.create({
      ...newUser,
      password: hash
    });

    return await this.usuariosRepository.save(Usuario);
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  async findOne(nombre: string) {
    const usuario = await this.usuariosRepository.findOneBy({nombre});
    if(!usuario) throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
    return usuario;
  }

  async update(id: number, updateUsuario: UpdateUsuarioDto) {
    const update =  await this.usuariosRepository.update(id,updateUsuario);
    const user = this.usuariosRepository.findOne({
      where :{
        idUsuario : id
      }
    })
    
    return user;

  }

  async updatestate(id: number){
    const usuario = await this.usuariosRepository.findOne({
      where: {
        idUsuario: id
      }
    });
    if(!usuario) throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
    await this.usuariosRepository.update(id,{estado : !(usuario.estado)})

    return usuario
  }


  
}
