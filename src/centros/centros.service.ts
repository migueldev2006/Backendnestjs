import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';
import { Centros } from './entities/centro.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CentrosService {

  constructor(
    @InjectRepository(Centros)
    private centrosRepository: Repository<Centros>,
  ){}

  async create(createCentroDto: CreateCentroDto) {
    const newCentro = this.centrosRepository.create({
      ...createCentroDto,
      fkMunicipio: { idMunicipio : createCentroDto.fkMunicipio}
    });

    const centroSaved = await this.centrosRepository.save(newCentro);

    return centroSaved;
  }

  async findAll() {
    const centros = await this.centrosRepository.find({
      relations: ["fkMunicipio"]
    });
    return centros;
  }

  async findOne(id: number) {
    const centro = await this.centrosRepository.findOne({
      where: {
        idCentro: id
      }
    });
    if(!centro) throw new HttpException("Centro no encontrado",HttpStatus.NOT_FOUND);
    return centro;
  }

  async update(id: number, updateCentroDto: UpdateCentroDto) {
    const existingCentro = await this.centrosRepository.findOne({
      where : {
        idCentro: id
      }
    });
    if(!existingCentro) throw new HttpException("Centro no encontrado",HttpStatus.NOT_FOUND);

    const updatedCentro = await this.centrosRepository.update(id,{
      ...updateCentroDto,
      fkMunicipio: {
        idMunicipio: updateCentroDto.fkMunicipio
      }
    });
    if(!updatedCentro.affected) return new HttpException("Error actualizando centro",HttpStatus.BAD_REQUEST);

    const newCentro = await this.centrosRepository.findOne({
      where : {
        idCentro: id
      }
    });

    return newCentro;
  }

  async updateStatus(id : number){
    const existingCentro = await this.centrosRepository.findOne({
      where : {
        idCentro: id
      }
    });
    if(!existingCentro) throw new HttpException("Centro no encontrado",HttpStatus.NOT_FOUND);
    return await this.centrosRepository.update(id,{estado: !existingCentro.estado});
  }

}
