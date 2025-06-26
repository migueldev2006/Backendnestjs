import { Injectable } from '@nestjs/common';
import { CreateElementoDto, UpdateElementoDto } from './dto';
import {  Repository } from 'typeorm';
import { ElementImage, Elementos } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';

@Injectable()
export class ElementosService {
  constructor(
    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,
    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,
    @InjectRepository(Sitios)
    private readonly sitioRepository: Repository<Sitios>,
  ) {}

  async create(createElementoDto: CreateElementoDto): Promise<Elementos> {
    const elemento = this.elementoRepository.create({
      ...createElementoDto,
      fkCategoria: { idCategoria: createElementoDto.fkCategoria },
      fkUnidadMedida: { idUnidad: createElementoDto.fkUnidadMedida },
      fkCaracteristica: createElementoDto.fkCaracteristica
      ? { idCaracteristica: createElementoDto.fkCaracteristica }
      : undefined,
          imagenElemento: [
      {
        url: createElementoDto.imagenElemento,
      },
    ],
    });

    const nuevoElemento = await this.elementoRepository.save(elemento);

    const sitio = await this.sitioRepository.find();

    const asignacionElementoSitio = sitio.map((sitio) =>
      this.inventarioRepository.create({
        fkElemento: nuevoElemento,
        fkSitio: sitio,
        stock: 0,
        estado: false,
      }),
    );

    await this.inventarioRepository.save(asignacionElementoSitio);

    return nuevoElemento;
  }

  async findAll(): Promise<Elementos[]> {
    return await this.elementoRepository.find(
      {relations: ['imagenElemento'],}
    );
  }

  async findOne(idElemento: number): Promise<Elementos | null> {
    const getElementoById = await this.elementoRepository.findOneBy({
      idElemento,
    });

    if (!getElementoById) {
      throw new Error(
        `No se encontro el elemento, el id ${idElemento} no existe`,
      );
    }

    return getElementoById;
  }

  async update(
    idElemento: number,
    updateElementoDto: UpdateElementoDto,
  ): Promise<Elementos> {
const getElementoById = await this.elementoRepository.findOne({
    where: { idElemento },
    relations: ['imagenElemento'],
  });

  if (!getElementoById) {
    throw new Error(`No se encontró el elemento, el id ${idElemento} no existe`);
  }


  getElementoById.nombre = updateElementoDto.nombre ?? getElementoById.nombre;
  getElementoById.descripcion = updateElementoDto.descripcion ?? getElementoById.descripcion;

if (updateElementoDto.imagenElemento) {
    const nuevaImagen = Object.assign(new ElementImage(), {
      url: updateElementoDto.imagenElemento,
    });
    getElementoById.imagenElemento = [nuevaImagen];
  }

  return await this.elementoRepository.save(getElementoById);
  }

  async changeStatus(idElemento: number) {
    const getElementoById = await this.elementoRepository.findOneBy({
      idElemento,
    });

    if (!getElementoById) {
      throw new Error(
        `No se encontro el elemento, el id ${idElemento} no existe`,
      );
    }

    getElementoById.estado = !getElementoById.estado;

    return await this.elementoRepository.save(getElementoById);
  }
}
