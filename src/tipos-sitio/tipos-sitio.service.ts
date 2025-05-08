import { Injectable } from '@nestjs/common';
import { CreateTiposSitioDto } from './dto/create-tipos-sitio.dto';
import { UpdateTiposSitioDto } from './dto/update-tipos-sitio.dto';

@Injectable()
export class TiposSitioService {
  create(createTiposSitioDto: CreateTiposSitioDto) {
    return 'This action adds a new tiposSitio';
  }

  findAll() {
    return `This action returns all tiposSitio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposSitio`;
  }

  update(id: number, updateTiposSitioDto: UpdateTiposSitioDto) {
    return `This action updates a #${id} tiposSitio`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposSitio`;
  }
}
