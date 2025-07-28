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

  const permisos = await this.permisoRepository.find({
    relations: ['fkRuta', 'fkRuta.fkModulo'],
  });

  
  const rolpermisos = await this.rolPermisoRepository.find({
    where: {
      fkRol: { idRol: idrol },
      estado: true
    },
    relations: ['fkPermiso']
  });

  const permisosAsignados = rolpermisos.map(rp => rp.fkPermiso.idPermiso);

  
  const modulosMap = new Map<number, any>();

  for (const permiso of permisos) {
    const modulo = permiso.fkRuta.fkModulo;
    const ruta = permiso.fkRuta;

    if (!modulosMap.has(modulo.idModulo)) {
      modulosMap.set(modulo.idModulo, {
        idModulo: modulo.idModulo,
        nombreModulo: modulo.nombre,
        rutas: new Map<number, any>()
      });
    }

    const moduloData = modulosMap.get(modulo.idModulo);

    if (!moduloData.rutas.has(ruta.idRuta)) {
      moduloData.rutas.set(ruta.idRuta, {
        idRuta: ruta.idRuta,
        nombreRuta: ruta.nombre,
        permisos: []
      });
    }

    moduloData.rutas.get(ruta.idRuta).permisos.push({
      idPermiso: permiso.idPermiso,
      permiso: permiso.permiso
    });
  }

 
  const permisosAgrupados = Array.from(modulosMap.values()).map(modulo => ({
    ...modulo,
    rutas: Array.from(modulo.rutas.values())
  }));

  return {
    permisosAsignados,
    permisosAgrupados
  };
}


  async changeStatus(idPermiso: number, idRol: number): Promise<RolPermiso> {

    const getrolPermiso = await this.rolPermisoRepository.findOne({
      where: {
        fkPermiso: { idPermiso },
        fkRol: { idRol }
      }
    });

    if (!getrolPermiso) return await this.rolPermisoRepository.save({ fkPermiso: { idPermiso }, fkRol: { idRol }, estado: true });

    getrolPermiso.estado = !getrolPermiso?.estado;

    await this.rolPermisoRepository.save(getrolPermiso);

    return getrolPermiso;
  }
}
