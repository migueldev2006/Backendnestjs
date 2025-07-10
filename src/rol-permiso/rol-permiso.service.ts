import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolPermisoDto, UpdateRolPermisoDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolPermiso } from './entities/rol-permiso.entity';
import { Repository } from 'typeorm';
import { Permisos } from 'src/permisos/entities/permiso.entity';

@Injectable()
export class RolPermisoService {
  constructor(
    @InjectRepository(RolPermiso)
    private readonly rolPermisoRepository: Repository<RolPermiso>,
    @InjectRepository(Permisos)
    private readonly permisoRepository: Repository<Permisos>
  ) { }

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

  async getpermisosrol(idrol: number) {
    const permisos = await this.permisoRepository.find()

    const rolpermisos = await this.rolPermisoRepository.find({
      where:{
        fkRol:{idRol: idrol},
        estado: true
      },
      relations :['fkPermiso']
    })

      const permisosAsignados = rolpermisos.map(rp => rp.fkPermiso.idPermiso);

      return{
        permisos,
        permisosAsignados
      }
  }

  async changeStatus(idPermiso: number, idRol: number): Promise<RolPermiso> {

    const getrolPermiso = await this.rolPermisoRepository.findOne({
      where: {
        fkPermiso: {idPermiso},
        fkRol: {idRol}
      }
    });

    if (!getrolPermiso) return await this.rolPermisoRepository.save({fkPermiso: {idPermiso}, fkRol: {idRol}, estado: true});

    getrolPermiso.estado = !getrolPermiso?.estado;

    await this.rolPermisoRepository.save(getrolPermiso);

    return getrolPermiso;
  }
}
