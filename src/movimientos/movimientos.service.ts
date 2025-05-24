import { Injectable } from '@nestjs/common';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto';
import { Movimientos } from './entities/movimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimientos)
    private readonly movimientoRepository: Repository<Movimientos>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimientos> {
    const movimiento = this.movimientoRepository.create({
      ...createMovimientoDto,
      fkInventario: { idInventario: createMovimientoDto.fkInventario },
      fkSitio: { idSitio: createMovimientoDto.fkSitio },
      fkTipoMovimiento: { idTipo: createMovimientoDto.fkTipoMovimiento },
      fkUsuario: { idUsuario: createMovimientoDto.fkUsuario },
    });
    return await this.movimientoRepository.save(movimiento);
  }

  async findAll(): Promise<Movimientos[]> {
    return await this.movimientoRepository.find();
  }

  async findOne(idMovimiento: number): Promise<Movimientos | null> {
    const getMovimientoById = await this.movimientoRepository.findOneBy({
      idMovimiento,
    });

    if (!getMovimientoById) {
      throw new Error(`No existe el movimiento con ese id`);
    }

    return getMovimientoById;
  }

  async update(
    idMovimiento: number,
    updateMovimientoDto: UpdateMovimientoDto,
  ): Promise<Movimientos> {
    const getMovimientoById = await this.movimientoRepository.preload({
      idMovimiento,
      ...updateMovimientoDto,
      fkInventario: { idInventario: updateMovimientoDto.fkInventario },
      fkSitio: { idSitio: updateMovimientoDto.fkSitio },
      fkTipoMovimiento: { idTipo: updateMovimientoDto.fkTipoMovimiento },
      fkUsuario: { idUsuario: updateMovimientoDto.fkUsuario },
    });

    if (!getMovimientoById) {
      throw new Error(`No existe el movimiento con ese id`);
    }

    return this.movimientoRepository.save(getMovimientoById);
  }

  // async accept(idMovimiento: number): Promise<Movimientos> {
  //   return `This action removes a #${id} movimiento`;
  // }
  // async cancel(idMovimiento: number): Promise<Movimientos> {
  //   return `This action removes a #${id} movimiento`;
  // }
}
