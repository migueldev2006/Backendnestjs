import { Injectable } from '@nestjs/common';
import { CreateUsuarioFichaDto, UpdateUsuarioFichaDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioFicha } from './entities/usuario-ficha.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioFichaService {
  constructor(
    @InjectRepository(UsuarioFicha)
    private readonly usuarioFichaRepository: Repository<UsuarioFicha>,
  ) {}
  async create(
    createUsuarioFichaDto: CreateUsuarioFichaDto,
  ): Promise<UsuarioFicha> {
    const usuarioFicha = this.usuarioFichaRepository.create({
      ...createUsuarioFichaDto,
      fkFicha: { idFicha: createUsuarioFichaDto.fkFicha },
      fkUsuario: { idUsuario: createUsuarioFichaDto.fkUsuario },
    });

    return await this.usuarioFichaRepository.save(usuarioFicha);
  }

  async findAll(): Promise<UsuarioFicha[]> {
    return await this.usuarioFichaRepository.find();
  }

  async findOne(idUsuarioFicha: number): Promise<UsuarioFicha | null> {
    const getUsuarioFicha = await this.usuarioFichaRepository.findOneBy({
      idUsuarioFicha,
    });

    if (!getUsuarioFicha) {
      throw new Error(
        `No se encontraron asignaciones relacionadas con este id`,
      );
    }
    return getUsuarioFicha;
  }

  async update(
    idUsuarioFicha: number,
    updateUsuarioFichaDto: UpdateUsuarioFichaDto,
  ): Promise<UsuarioFicha> {
    const getUsuarioFicha = await this.usuarioFichaRepository.preload({
      idUsuarioFicha,
      ...updateUsuarioFichaDto,
      fkFicha: { idFicha: updateUsuarioFichaDto.fkFicha },
      fkUsuario: { idUsuario: updateUsuarioFichaDto.fkUsuario },
    });

    if (!getUsuarioFicha) {
      throw new Error(
        `No se encontraron asignaciones relacionadas con este id `,
      );
    }

    return this.usuarioFichaRepository.save(getUsuarioFicha);
  }
}
