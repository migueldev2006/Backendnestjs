import { Injectable } from '@nestjs/common';
import { CreateSitioDto, UpdateSitioDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitios } from './entities/sitio.entity';
import { Repository } from 'typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Elementos } from 'src/elementos/entities/elemento.entity';

@Injectable()
export class SitiosService {
  constructor(
    @InjectRepository(Sitios)
    private readonly sitioRepository: Repository<Sitios>,
    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,
    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,
  ) {}
  async create(createSitioDto: CreateSitioDto): Promise<Sitios> {
    const sitio = this.sitioRepository.create({
      ...createSitioDto,
      fkArea: { idArea: createSitioDto.fkArea },
      fkTipoSitio: { idTipo: createSitioDto.fkTipoSitio },
    });

    const nuevoSitio = await this.sitioRepository.save(sitio);

    const elemento = await this.elementoRepository.find();

    const asignacionElementoSitio = elemento.map((elemento) => {
      return this.inventarioRepository.create({
        fkSitio: nuevoSitio,
        fkElemento: elemento,
        stock: 0,
        estado: false,
      });
    });

    await this.inventarioRepository.save(asignacionElementoSitio);
    return nuevoSitio;
  }

  async findAll(): Promise<Sitios[]> {
    return await this.sitioRepository.find({ relations: ['fkArea'] });
  }

  async findOne(idSitio: number): Promise<Sitios> {
    const getSitio = await this.sitioRepository.findOneBy({ idSitio });

    if (!getSitio) {
      throw new Error(`No se encuentra el sitio con el id ${idSitio}`);
    }

    return getSitio;
  }

  async update(idSitio: number, updateSitioDto: UpdateSitioDto) {
    const getSitioById = await this.sitioRepository.findOneBy({
      idSitio,
    });

    if (!getSitioById) {
      throw new Error(`No existe el area con el id ${idSitio}`);
    }

    await this.sitioRepository.update(idSitio, {
      nombre: updateSitioDto.nombre,
      personaEncargada: updateSitioDto.personaEncargada,
      ubicacion: updateSitioDto.ubicacion,
    });

    return getSitioById;
  }

  async changeStatus(idSitio: number) {
    const getSitio = await this.sitioRepository.findOneBy({ idSitio });

    if (!getSitio) {
      throw new Error(`No se encuentra el sitio con el id ${idSitio}`);
    }

    getSitio.estado = !getSitio.estado;

    return this.sitioRepository.save(getSitio);
  }
}
  