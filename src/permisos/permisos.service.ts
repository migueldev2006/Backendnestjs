import { Injectable } from '@nestjs/common';
import { CreatePermisoDto, UpdatePermisoDto } from './dto'; 
import { Repository } from 'typeorm';
import { Permisos } from './entities/permiso.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permisos)
    private readonly permisoRepository: Repository<Permisos>
  ){}
  
  async create(createPermisoDto: CreatePermisoDto):Promise<Permisos> {
    const permiso = this.permisoRepository.create(createPermisoDto)
    return await this.permisoRepository.save(permiso);
  }

  async findAll():Promise<Permisos[]> {
    return await this.permisoRepository.find();
  }

  async findOne(idPermiso: number):Promise<Permisos | null> {
    const getPermisoById = await this.permisoRepository.findOneBy({idPermiso})

    if (!getPermisoById) {
      throw new Error(`No se encontro el permiso con el id especificado`)
    }
    return getPermisoById;
  }

  async update(idPermiso: number, updatePermisoDto: UpdatePermisoDto):Promise<Permisos> {
    const getPermisoById = await this.permisoRepository.preload({
      idPermiso,
      ...updatePermisoDto
    })

    if (!getPermisoById) {
      throw new Error(`No se encontro el permiso con el id especificado, no se puede actualuzar`)
    }

    return getPermisoById;
  }
}
