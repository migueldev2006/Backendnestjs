import { Injectable } from '@nestjs/common';
import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private readonly notificacionRepository:Repository<Notificaciones>
  ){}
  async create(createNotificacioneDto: CreateNotificacioneDto) {
    return 'This action adds a new notificacione';
  }

  async findAll() {
    return `This action returns all notificaciones`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }
}
