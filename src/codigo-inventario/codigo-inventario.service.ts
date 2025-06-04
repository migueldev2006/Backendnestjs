import { Injectable } from '@nestjs/common';
import { CreateCodigoInventarioDto } from './dto/create-codigo-inventario.dto';
import { UpdateCodigoInventarioDto } from './dto/update-codigo-inventario.dto';

@Injectable()
export class CodigoInventarioService {
  create(createCodigoInventarioDto: CreateCodigoInventarioDto) {
    return 'This action adds a new codigoInventario';
  }

  findAll() {
    return `This action returns all codigoInventario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codigoInventario`;
  }

  update(id: number, updateCodigoInventarioDto: UpdateCodigoInventarioDto) {
    return `This action updates a #${id} codigoInventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} codigoInventario`;
  }
}
