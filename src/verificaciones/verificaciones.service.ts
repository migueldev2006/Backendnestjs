import { Injectable } from '@nestjs/common';
import { CreateVerificacioneDto } from './dto/create-verificacione.dto';
import { UpdateVerificacioneDto } from './dto/update-verificacione.dto';

@Injectable()
export class VerificacionesService {
  create(createVerificacioneDto: CreateVerificacioneDto) {
    return 'This action adds a new verificacione';
  }

  findAll() {
    return `This action returns all verificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verificacione`;
  }

  update(id: number, updateVerificacioneDto: UpdateVerificacioneDto) {
    return `This action updates a #${id} verificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} verificacione`;
  }
}
