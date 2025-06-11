import { Injectable } from '@nestjs/common';
import { CreateTiposMovimientoDto, UpdateTiposMovimientoDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoMovimientos } from './entities/tipos-movimiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposMovimientoService {
  constructor(
    @InjectRepository(TipoMovimientos)
    private readonly tipoRepository: Repository<TipoMovimientos>,
  ) {}

  async create(
    createTiposMovimientoDto: CreateTiposMovimientoDto,
  ): Promise<TipoMovimientos> {
    const tipo = this.tipoRepository.create(createTiposMovimientoDto);
    return await this.tipoRepository.save(tipo);
  }

  async findAll(): Promise<TipoMovimientos[]> {
    return await this.tipoRepository.find();
  }

  async findOne(idTipo: number): Promise<TipoMovimientos | null> {
    const getTipoById = await this.tipoRepository.findOneBy({ idTipo });

    if (!getTipoById) {
      throw new Error(`El tipo de movimeinto con el id ${idTipo} no existe`);
    }

    return getTipoById;
  }

  async update(
    idTipo: number,
    updateTiposMovimientoDto: UpdateTiposMovimientoDto,
  ): Promise<TipoMovimientos> {
    const getTipo = await this.tipoRepository.findOneBy({
      idTipo,
    });

    if (!getTipo) {
      throw new Error(`No se encuentra el tipo de movimiento con el id ${idTipo}`);
    }

    await this.tipoRepository.update(idTipo, updateTiposMovimientoDto)

    return getTipo;
  }

  async changeStatus(idTipo: number): Promise<TipoMovimientos> {
    const getTipo = await this.tipoRepository.findOneBy({ idTipo });

    if (!getTipo) {
      throw new Error(`No se encuentra el tipo de movimento`);
    }

    getTipo.estado = !getTipo.estado;

    return this.tipoRepository.save(getTipo);
  }
}
