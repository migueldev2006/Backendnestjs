import { Injectable } from '@nestjs/common';
import { CreateSitioDto, UpdateSitioDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitios } from './entities/sitio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SitiosService {
  constructor(
    @InjectRepository(Sitios)
    private readonly sitioRepository: Repository<Sitios>
  ){}
  async create(createSitioDto: CreateSitioDto):Promise<Sitios> {
    const sitio = this.sitioRepository.create({
      ...createSitioDto,
      fkArea:{idArea:createSitioDto.fkArea},
      fkTipoSitio:{idTipo:createSitioDto.fkTipoSitio}
    })
    return await this.sitioRepository.save(sitio);
  }

  async findAll():Promise<Sitios[]> {
    return await this.sitioRepository.find();
  }

  async findOne(idSitio: number):Promise<Sitios> {
    const getSitio = await this.sitioRepository.findOneBy({idSitio})

    if (!getSitio) {
      throw new Error(`No se encuentra el sitio con el id ${idSitio}`)
    }

    return getSitio;
  }

  async update(idSitio: number, updateSitioDto: UpdateSitioDto) {
    const getSitioById = await this.sitioRepository.findOneBy({
      idSitio,
    })

    
    if (!getSitioById) {
      throw new Error(`No existe el area con el id ${idSitio}`)
    }

    await this.sitioRepository.update(idSitio, {
      nombre:updateSitioDto.nombre,
      personaEncargada:updateSitioDto.personaEncargada,
      ubicacion:updateSitioDto.ubicacion
      
    });

    return getSitioById;
  }
  

  async changeStatus(idSitio: number) {
    const getSitio = await this.sitioRepository.findOneBy({idSitio})

    if (!getSitio) {
      throw new Error(`No se encuentra el sitio con el id ${idSitio}`)
    }

    getSitio.estado = !getSitio.estado

    return getSitio;

  }
}
