import { Injectable } from '@nestjs/common';
import { CreateUsuarioFichaDto } from './dto/create-usuario-ficha.dto';
import { UpdateUsuarioFichaDto } from './dto/update-usuario-ficha.dto';

@Injectable()
export class UsuarioFichaService {
  create(createUsuarioFichaDto: CreateUsuarioFichaDto) {
    return 'This action adds a new usuarioFicha';
  }

  findAll() {
    return `This action returns all usuarioFicha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioFicha`;
  }

  update(id: number, updateUsuarioFichaDto: UpdateUsuarioFichaDto) {
    return `This action updates a #${id} usuarioFicha`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioFicha`;
  }
}
