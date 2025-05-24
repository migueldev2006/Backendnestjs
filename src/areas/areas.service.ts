import { Injectable } from '@nestjs/common';
import { CreateAreaDto, UpdateAreaDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Areas } from './entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private readonly areaReposiory:Repository<Areas>
  ){}

  async create(createAreaDto: CreateAreaDto):Promise<Areas> {
    const area = this.areaReposiory.create({
      ...createAreaDto,
      fkSede:{idSede:createAreaDto.fkSede},
      fkUsuario:{idUsuario:createAreaDto.fkSede}
    });
    return await this.areaReposiory.save(area);
  }

  async findAll():Promise<Areas[]> {
    return await this.areaReposiory.find();
  }

  async findOne(idArea: number):Promise<Areas | null> {
    const getAreaById = await this.areaReposiory.findOneBy({idArea});

    if (!getAreaById) {
      throw new Error(`El id ${idArea} no se encuentra registrado`)
    }

    return getAreaById;
  }

  async update(idArea: number, updateAreaDto: UpdateAreaDto):Promise<Areas> {
    const getAreaById = await this.areaReposiory.preload({
      idArea,
      ...updateAreaDto,
      fkSede:{idSede:updateAreaDto.fkSede},
      fkUsuario:{idUsuario:updateAreaDto.fkSede}
    });

    if (!getAreaById) {
      throw new Error(`El id ${idArea} no se encuentra registrado`)
    }

    return this.areaReposiory.save(getAreaById);
  }

  async changeStatus(idArea: number):Promise<Areas> {
    const getAreaById = await this.areaReposiory.findOneBy({idArea});

    if (!getAreaById) {
      throw new Error(`El id ${idArea} no se encuentra registrado`)
    }

    getAreaById.estado = !getAreaById.estado

    return getAreaById
  }
}
