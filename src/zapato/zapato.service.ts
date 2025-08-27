import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Zapatos } from './entities/zapato.entity';
import { CreateZapatoDto, UpdateZapatoDto } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class ZapatoService {
  constructor(
    @InjectRepository(Zapatos)
    private readonly zapatoRepository: Repository<Zapatos>,
  ) {}
  async create(createZapatoDto: CreateZapatoDto): Promise<Zapatos> {
    const zapato = this.zapatoRepository.create(createZapatoDto);
    return await this.zapatoRepository.save(zapato);
  }

  async findAll(): Promise<Zapatos[]> {
    return await this.zapatoRepository.find();
  }

  async findOne(idZapato: number) {
    const zapato = await this.zapatoRepository.findOneBy({ idZapato });
    if (!zapato) {
      throw new Error(`No se encuentra el zapato con el id ${idZapato}`);
    }

    return zapato;
  }

  async update(idZapato: number, updateZapatoDto: UpdateZapatoDto):Promise<Zapatos> {
    const getZapato = await this.zapatoRepository.findOneBy({idZapato});

    if (!getZapato) {
      throw new Error(`No existe el zapato con el id ${idZapato}`)
    }

  Object.assign(getZapato, updateZapatoDto);

  const updatedZapato = await this.zapatoRepository.save(getZapato);
  return updatedZapato;
  }
}
