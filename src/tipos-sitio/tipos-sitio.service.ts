import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTiposSitioDto } from './dto/create-tipos-sitio.dto';
import { UpdateTiposSitioDto } from './dto/update-tipos-sitio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoSitios } from './entities/tipos-sitio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposSitioService {

  constructor ( 
    @InjectRepository(TipoSitios)
    private tipoSitioRepository : Repository<TipoSitios>
  ){}

   async create(newTipoSitio: CreateTiposSitioDto) {
      const TipoSitio = this.tipoSitioRepository.create(newTipoSitio);
      return await this.tipoSitioRepository.save(TipoSitio);
    }

  findAll() {
    return this.tipoSitioRepository.find();
  }

  async findOne(nombre: string) {
    const tipoSitio = await this.tipoSitioRepository.findOneBy({nombre});
    if(!tipoSitio) throw new HttpException("Tipo de sitio no encontrado", HttpStatus.NOT_FOUND);
    return tipoSitio;
  }

  update(id: number, updateTiposSitio: UpdateTiposSitioDto) {
    return this.tipoSitioRepository.update(id,updateTiposSitio);
  }

  async updatestate(id: number){
      const tipoSitio = await this.tipoSitioRepository.findOne({
        where: {
          idTipo: id
        }
      });
      if(!tipoSitio) throw new HttpException("Tipo de sitio no encontrado", HttpStatus.NOT_FOUND)
      return this.tipoSitioRepository.update(id,{estado : !(tipoSitio.estado)})
    }
}
