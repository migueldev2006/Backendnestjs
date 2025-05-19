import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caracteristicas } from './entities/caracteristica.entity'
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class CaracteristicasService {

  constructor(
    @InjectRepository(Caracteristicas)
    private caracteristicasRepository: Repository<Caracteristicas>
  ){}

  async create(createCaracteristicaDto: CreateCaracteristicaDto) {
    const newCaracteristicas = this.caracteristicasRepository.create({
      ...createCaracteristicaDto,
      fkElemento: {
        idElemento: createCaracteristicaDto.fkElemento
      }
    });

    const savedCaracteristica = await this.caracteristicasRepository.save(newCaracteristicas);
    return savedCaracteristica;
  }

  async findAll() {
    return await this.caracteristicasRepository.find();
  }

  async findOne(nombre: string) {
    const caracteristicas = await this.caracteristicasRepository.findOneBy({nombre});
    if(!caracteristicas) throw new HttpException("Caracteristica no encontrada",HttpStatus.NOT_FOUND);
    return caracteristicas
  }

  async update(id: number, updateCaracteristica: UpdateCaracteristicaDto) {
    const caracteristicas = await this.caracteristicasRepository.findOne({
      where: {
        idCaracteristica: id
      },
      relations: ["fkElemento"]
    });
    if(!caracteristicas) throw new HttpException("Caracteristica no encontrada",HttpStatus.NOT_FOUND);

    const updatedCaracteristica = await this.caracteristicasRepository.update(id,{
      ...updateCaracteristica,
      fkElemento: {
        idElemento: updateCaracteristica.fkElemento ?? caracteristicas.fkElemento.idElemento
      }
    })
    if(!updatedCaracteristica.affected) throw new HttpException("Error actualizano caracteristica",HttpStatus.BAD_REQUEST);

    const newCaracteristica = await this.caracteristicasRepository.findOne({
      where: {
        idCaracteristica: id
      }
    });
    return newCaracteristica;
  }

}
