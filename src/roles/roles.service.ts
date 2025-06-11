import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    const rol = this.rolRepository.create(createRoleDto);
    return await this.rolRepository.save(rol);
  }

  async findAll(): Promise<Roles[]> {
    return await this.rolRepository.find();
  }

  async findOne(idRol: number): Promise<Roles | null> {
    const getRolById = await this.rolRepository.findOneBy({ idRol });
    if (!getRolById) {
      throw new Error(`El rol con el id ${idRol} no existe`);
    }
    return getRolById;
  }

  async update(idRol: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const getRolById = await this.rolRepository.findOneBy({
      idRol,
    });

    if (!getRolById) {
      throw new Error(`El rol con el id ${idRol} no existe`);
    }

    await this.rolRepository.update(idRol, updateRoleDto);

    return getRolById;
  }

  async changeStatus(idRol: number): Promise<Roles> {
    const getRolById = await this.rolRepository.findOneBy({ idRol });
    if (!getRolById) {
      throw new Error(`El rol con el id ${idRol} no existe`);
    }

    getRolById.estado = !getRolById.estado;

    return getRolById;
  }
}
