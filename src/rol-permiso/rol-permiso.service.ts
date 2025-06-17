import { Injectable } from '@nestjs/common';
import { CreateRolPermisoDto, UpdateRolPermisoDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolPermiso } from './entities/rol-permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolPermisoService {
  constructor(
    @InjectRepository(RolPermiso)
    private readonly rolPermisoRepository: Repository<RolPermiso>,
  ) {}

  async create(createRolPermisoDto: CreateRolPermisoDto): Promise<RolPermiso> {
    const rolPermiso = this.rolPermisoRepository.create({
      ...createRolPermisoDto,
      fkPermiso: { idPermiso: createRolPermisoDto.fkPermiso },
      fkRol: { idRol: createRolPermisoDto.fkRol },
    });

    return await this.rolPermisoRepository.save(rolPermiso);
  }

  async findAll(): Promise<RolPermiso[]> {
    return await this.rolPermisoRepository.find();
  }

  async findOne(idRolPermiso: number): Promise<RolPermiso | null> {
    const getRolPermisoById = await this.rolPermisoRepository.findOneBy({
      idRolPermiso,
    });

    if (!getRolPermisoById) {
      throw new Error(`El id ${idRolPermiso} no se encuentra registrado`);
    }

    return getRolPermisoById;
  }

  async update(
    idRolPermiso: number,
    updateRolPermisoDto: UpdateRolPermisoDto,
  ): Promise<RolPermiso> {
    const getlPermiso = await this.rolPermisoRepository.preload({
      idRolPermiso,
      ...updateRolPermisoDto,
      fkPermiso: { idPermiso: updateRolPermisoDto.fkPermiso },
      fkRol: { idRol: updateRolPermisoDto.fkRol },
    });

    if (!getlPermiso) {
      throw new Error(`El id ${idRolPermiso} no se encuentra registrado`);
    }

    return this.rolPermisoRepository.save(getlPermiso);
  }


  async changeStatus (idRolPermiso:number):Promise<RolPermiso>{
    const getrolPermiso = await this.rolPermisoRepository.findOneBy({idRolPermiso});

    if(!getrolPermiso){
      throw new Error(`El id ${idRolPermiso} no se encuentra registrado`)
    }
    getrolPermiso.estado = !getrolPermiso.estado

    return this.rolPermisoRepository.save(getrolPermiso);
  }
}
