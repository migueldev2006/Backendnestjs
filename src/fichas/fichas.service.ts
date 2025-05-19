import { Injectable } from '@nestjs/common';
import { CreateFichaDto, UpdateFichaDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fichas } from './entities/ficha.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FichasService {
  constructor(
    @InjectRepository(Fichas)
    private readonly fichaRepository: Repository<Fichas>,
  ) {}
  async create(createFichaDto: CreateFichaDto): Promise<Fichas> {
    const ficha = this.fichaRepository.create({
      ...createFichaDto,
      fkPrograma: { idPrograma: createFichaDto.fkPrograma },
    });
    return await this.fichaRepository.save(ficha);
  }

  async findAll(): Promise<Fichas[]> {
    return await this.fichaRepository.find();
  }

  async findOne(idFicha: number): Promise<Fichas | null> {
    const getFichaById = await this.fichaRepository.findOneBy({ idFicha });

    if (!getFichaById) {
      throw new Error(`No existe una ficha con este id`);
    }

    return getFichaById;
  }

  async update(
    idFicha: number,
    updateFichaDto: UpdateFichaDto,
  ): Promise<Fichas> {
    const getFichaById = await this.fichaRepository.preload({
      idFicha,
      ...updateFichaDto,
      fkPrograma: { idPrograma: updateFichaDto.fkPrograma },
    });

    if (!getFichaById) {
      throw new Error(`No existe una ficha con este id`);
    }

    return this.fichaRepository.save(getFichaById);
  }

  async changeStatus(idFicha: number) {
    const getFichaById = await this.fichaRepository.findOneBy({ idFicha });

    if (!getFichaById) {
      throw new Error(`No existe una ficha con este id`);
    }

    getFichaById.estado = !getFichaById.estado;

    return getFichaById;
  }
}
