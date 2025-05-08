import { Injectable } from '@nestjs/common';
import { CreateProgramasFormacionDto } from './dto/create-programas-formacion.dto';
import { UpdateProgramasFormacionDto } from './dto/update-programas-formacion.dto';

@Injectable()
export class ProgramasFormacionService {
  create(createProgramasFormacionDto: CreateProgramasFormacionDto) {
    return 'This action adds a new programasFormacion';
  }

  findAll() {
    return `This action returns all programasFormacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programasFormacion`;
  }

  update(id: number, updateProgramasFormacionDto: UpdateProgramasFormacionDto) {
    return `This action updates a #${id} programasFormacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} programasFormacion`;
  }
}
