import { Injectable } from '@nestjs/common';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitudes } from './entities/solicitude.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitudes)
    private readonly solicitudRepository:Repository<Solicitudes>
  ){}
  async create(createSolicitudeDto: CreateSolicitudeDto):Promise<Solicitudes> {
    const solicitud = this.solicitudRepository.create({
      ...createSolicitudeDto,
      fkInventario:{idInventario:createSolicitudeDto.fkInventario},
      fkUsuario:{idUsuario:createSolicitudeDto.fkUsuario}
    });

    return await this.solicitudRepository.save(solicitud);
  }

  async findAll():Promise<Solicitudes[]> {
    return await this.solicitudRepository.find();
  }

  async findOne(idSolicitud: number):Promise<Solicitudes | null> {
    const getSoliById = await this.solicitudRepository.findOneBy({idSolicitud})

    if (!getSoliById) {
      throw new Error(`La solicitud con id ${idSolicitud} no existe`)
    }
    return getSoliById;
  }

  async update(idSolicitud: number, updateSolicitudeDto: UpdateSolicitudeDto):Promise<Solicitudes> {
    const getSoliById = await  this.solicitudRepository.preload({
      idSolicitud,
      ...updateSolicitudeDto,
      fkInventario:{idInventario:updateSolicitudeDto.fkInventario},
      fkUsuario:{idUsuario:updateSolicitudeDto.fkUsuario}
    });

    if (!getSoliById) {
      throw new Error(`La solicitud con id ${idSolicitud} no existe`)
    }

    return this.solicitudRepository.save(getSoliById);
  }

}
