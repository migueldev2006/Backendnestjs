import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipios } from './entities/municipio.entity';
@Injectable()
export class MunicipiosService {

  constructor(
    @InjectRepository(Municipios)
    private municipiosRepository : Repository<Municipios>
  ){}

  async create(createMunicipioDto: CreateMunicipioDto) {
    const createdMunicipio = await this.municipiosRepository.create(createMunicipioDto);
    const newMunicipio = await this.municipiosRepository.save(createdMunicipio);
    return newMunicipio;
  }

  async findAll() {
    return await this.municipiosRepository.find();
  }

  async findOne(id: number) {
    const existingMunicipio = await this.municipiosRepository.findOne({
      where: {
        idMunicipio : id
      }
    });
    if(!existingMunicipio) throw new HttpException("Municipio no encontrado",HttpStatus.NOT_FOUND);
    return existingMunicipio;
  }

  async update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    const existingMunicipio = await this.municipiosRepository.findOne({
      where: {
        idMunicipio : id
      }
    });
    if(!existingMunicipio) throw new HttpException("Municipio no encontrado",HttpStatus.NOT_FOUND);
    const updatedMunicipio = await this.municipiosRepository.update(id,updateMunicipioDto);
    if(!updatedMunicipio.affected) throw new HttpException("Error actualizando municipio",HttpStatus.BAD_REQUEST);

    const newMunicipio = await this.municipiosRepository.findOne({
      where: {
        idMunicipio : id
      }
    });

    return newMunicipio;
  }

  async updateStatus(id: number) {
    const existingMunicipio = await this.municipiosRepository.findOne({
      where: {
        idMunicipio : id
      }
    });
    if(!existingMunicipio) throw new HttpException("Municipio no encontrado",HttpStatus.NOT_FOUND);

    return await this.municipiosRepository.update(id,{estado: !existingMunicipio.estado});
  }
}
