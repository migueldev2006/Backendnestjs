import { Injectable } from '@nestjs/common';
import { CreateSedeDto, UpdateSedeDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sedes } from './entities/sede.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sedes)
    private readonly sedeRepository:Repository<Sedes>
  ){}

  async create(createSedeDto: CreateSedeDto):Promise<Sedes> {
    const sede = this.sedeRepository.create({
      ...createSedeDto,
      fkCentro:{idCentro:createSedeDto.fkCentro}
    });
    return await this.sedeRepository.save(sede);
  }

  async findAll():Promise<Sedes[]> {
    return await this.sedeRepository.find();
  }

  async findOne(idSede: number) :Promise<Sedes | null> {
  const getSedeById = await this.sedeRepository.findOneBy({idSede});

    if (!getSedeById) {
      throw new Error(`El id ${idSede} no se encuentra registrado`)
    }

    return getSedeById;
  }

  async update(idSede: number, updateSedeDto: UpdateSedeDto):Promise<Sedes> {
      const getSedeById = await this.sedeRepository.findOneBy({
      idSede,

    });

    if (!getSedeById) {
      throw new Error(`El id ${idSede} no se encuentra registrado`)
    }
    await this.sedeRepository.update(idSede,{
      nombre:updateSedeDto.nombre
    })
    return getSedeById;
  }

  async changeStatus(idSede: number):Promise<Sedes> {
      const getSedeById = await this.sedeRepository.findOneBy({idSede});
  
      if (!getSedeById) {
        throw new Error(`El id ${idSede} no se encuentra registrado`)
      }
  
      getSedeById.estado = !getSedeById.estado
  
      return getSedeById
  }
}
