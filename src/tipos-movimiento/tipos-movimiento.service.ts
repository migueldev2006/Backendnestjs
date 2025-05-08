import { Injectable } from '@nestjs/common';
import { CreateTiposMovimientoDto } from './dto/create-tipos-movimiento.dto';
import { UpdateTiposMovimientoDto } from './dto/update-tipos-movimiento.dto';

@Injectable()
export class TiposMovimientoService {
  create(createTiposMovimientoDto: CreateTiposMovimientoDto) {
    return 'This action adds a new tiposMovimiento';
  }

  findAll() {
    return `This action returns all tiposMovimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposMovimiento`;
  }

  update(id: number, updateTiposMovimientoDto: UpdateTiposMovimientoDto) {
    return `This action updates a #${id} tiposMovimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposMovimiento`;
  }
}
