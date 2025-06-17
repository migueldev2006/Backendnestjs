import { Injectable } from '@nestjs/common';
import { CreateProgramasFormacionDto, UpdateProgramasFormacionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramasFormacion } from './entities/programas-formacion.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProgramasFormacionService {
  constructor(
    @InjectRepository(ProgramasFormacion)
    private readonly programaRepository:Repository<ProgramasFormacion>
  ){}
  async create(createProgramasFormacionDto: CreateProgramasFormacionDto):Promise<ProgramasFormacion> {
    const programa = this.programaRepository.create({
      ...createProgramasFormacionDto,
      fkArea:{idArea:createProgramasFormacionDto.fkArea}
    })
    return await this.programaRepository.save(programa);
  }

  async findAll():Promise<ProgramasFormacion[]> {
    return await this.programaRepository.find();
  }

  async findOne(idPrograma: number) {
    const getProgramaById = await this.programaRepository.findOneBy({idPrograma})

    if (!getProgramaById) {
      throw new Error(`El programa con el id ${idPrograma} no se encuenttra registrado`)
    }

    return getProgramaById;
  }

  async update(idPrograma: number, updateProgramasFormacionDto: UpdateProgramasFormacionDto) {
    const getProgramaById = await this.programaRepository.findOneBy({idPrograma});

    if (!getProgramaById) {
      throw new Error(`El programa con el id ${idPrograma} no se encuentra registrado`)
    }
    await this.programaRepository.update(idPrograma,{
      nombre:updateProgramasFormacionDto.nombre
    });
    return getProgramaById;
  }

  async changeStatus(idPrograma: number) {
    const getProgramaById = await this.programaRepository.findOneBy({idPrograma})

    if (!getProgramaById) {
      throw new Error(`El id ${idPrograma} no se encuenttra registrado`)
    }

    getProgramaById.estado = !getProgramaById.estado

    return this.programaRepository.save(getProgramaById);
  
  }
}
