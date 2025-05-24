import { Injectable } from '@nestjs/common';
import { CreateElementoDto, UpdateElementoDto } from './dto';
import { Repository } from 'typeorm';
import { Elementos } from './entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ElementosService {
  constructor(
    @InjectRepository(Elementos)
    private readonly elementoRepository:Repository<Elementos>
  ){}

  async create(createElementoDto: CreateElementoDto):Promise<Elementos> {
    const elemento = this.elementoRepository.create({
      ...createElementoDto,
      fkCategoria:{idCategoria:createElementoDto.fkCategoria},
      fkUnidadMedida:{idUnidad:createElementoDto.fkUnidadMedida},
      images:createElementoDto.images.map((url) => ({url}))
    })
    return await this.elementoRepository.save(elemento);
  }

  async findAll():Promise<Elementos[]> {
    return await this.elementoRepository.find();
  }

  async findOne(idElemento: number):Promise<Elementos | null> {
    const getElementoById = await this.elementoRepository.findOneBy({idElemento});

    if (!getElementoById) {
      throw new Error(`No se encontro el elemento, el id ${idElemento} no existe`)
    }
    
    return getElementoById;
  }

  async update(idElemento: number, updateElementoDto: UpdateElementoDto):Promise<Elementos> {
    const getElementoById = await this.elementoRepository.preload({
      idElemento,
      ...updateElementoDto,
      fkCategoria:{idCategoria:updateElementoDto.fkCategoria},
      fkUnidadMedida:{idUnidad:updateElementoDto.fkUnidadMedida},
      images:updateElementoDto.images?.map((url) => ({url}))
    });

    if (!getElementoById) {
      throw new Error(`No se encontro el elemento, el id ${idElemento} no existe`)
    }

    return this.elementoRepository.save(getElementoById);
  }

  async changeStatus(idElemento: number) {
    const getElementoById = await this.elementoRepository.findOneBy({idElemento});

    if (!getElementoById) {
      throw new Error(`No se encontro el elemento, el id ${idElemento} no existe`)
    }

    getElementoById.estado = !getElementoById.estado

    return getElementoById;
  }
}
