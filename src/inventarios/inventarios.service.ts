import { Injectable } from '@nestjs/common';
import { CreateInventarioDto, UpdateInventarioDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventarios } from './entities/inventario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,
  ) {}
  async create(createInventarioDto: CreateInventarioDto): Promise<Inventarios> {
    const inventario = this.inventarioRepository.create({
      ...createInventarioDto,
      fkElemento: { idElemento: createInventarioDto.fkElemento },
      fkSitio: { idSitio: createInventarioDto.fkSitio },
    });
    return await this.inventarioRepository.save(inventario);
  }

  async findAll(): Promise<Inventarios[]> {
    return await this.inventarioRepository.find();
  }

  async findOne(idInventario: number): Promise<Inventarios | null> {
    const getInventarioById = await this.inventarioRepository.findOneBy({
      idInventario,
    });

    if (!getInventarioById) {
      throw new Error(
        `No hay elementos registrados en el inventario con este id`,
      );
    }

    return getInventarioById;
  }

  async update(
    idInventario: number,
    updateInventarioDto: UpdateInventarioDto,
  ): Promise<Inventarios> {
    const getInventarioById = await this.inventarioRepository.preload({
      idInventario,
      ...updateInventarioDto,
      fkElemento: { idElemento: updateInventarioDto.fkElemento },
      fkSitio: { idSitio: updateInventarioDto.fkSitio },
    });

    if (!getInventarioById) {
      throw new Error(
        `No hay elementos registrados en el inventario con este id`,
      );
    }

    return this.inventarioRepository.save(getInventarioById);
  }

  async changeStatus(idInventario: number): Promise<Inventarios> {
    const getInventarioById = await this.inventarioRepository.findOneBy({
      idInventario,
    });

    if (!getInventarioById) {
      throw new Error(
        `No hay elementos registrados en el inventario con este id`,
      );
    }

    getInventarioById.estado = !getInventarioById.estado;
    
    return getInventarioById;
  }
}
