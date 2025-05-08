import { Injectable } from '@nestjs/common';
import { CreateUnidadesMedidaDto } from './dto/create-unidades-medida.dto';
import { UpdateUnidadesMedidaDto } from './dto/update-unidades-medida.dto';

@Injectable()
export class UnidadesMedidaService {
  create(createUnidadesMedidaDto: CreateUnidadesMedidaDto) {
    return 'This action adds a new unidadesMedida';
  }

  findAll() {
    return `This action returns all unidadesMedida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidadesMedida`;
  }

  update(id: number, updateUnidadesMedidaDto: UpdateUnidadesMedidaDto) {
    return `This action updates a #${id} unidadesMedida`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidadesMedida`;
  }
}
