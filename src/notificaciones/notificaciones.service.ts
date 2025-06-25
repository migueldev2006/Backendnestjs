import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificaciones } from './entities/notificacione.entity';
import { CreateNotificacioneDto, UpdateNotificacioneDto } from './dto';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private readonly notificacionRepository: Repository<Notificaciones>,
  ) {}

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    const nueva = this.notificacionRepository.create({
      ...createNotificacioneDto,
      fkUsuario: { idUsuario: createNotificacioneDto.fkUsuario },
    });
    return await this.notificacionRepository.save(nueva);
  }

  async findAll() {
    return await this.notificacionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const notificacion = await this.notificacionRepository.findOneBy({
      idNotificacion: id,
    });

    if (!notificacion) {
      throw new NotFoundException(
        `No se encontró la notificación con id ${id}`,
      );
    }

    return notificacion;
  }

  async update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    const existe = await this.notificacionRepository.findOneBy({
      idNotificacion: id,
    });

    if (!existe) {
      throw new NotFoundException(`No existe la notificación con id ${id}`);
    }

    await this.notificacionRepository.update(id, {
      ...updateNotificacioneDto,
      fkUsuario: { idUsuario: updateNotificacioneDto.fkUsuario },
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const existe = await this.notificacionRepository.findOneBy({
      idNotificacion: id,
    });

    if (!existe) {
      throw new NotFoundException(`No existe la notificación con id ${id}`);
    }

    await this.notificacionRepository.remove(existe);
    return { message: 'Notificación eliminada correctamente' };
  }
}
