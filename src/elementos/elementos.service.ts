import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';
import { FileEnumerator } from 'eslint/use-at-your-own-risk';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { Elementos } from './entities/elemento.entity';

@Injectable()
export class ElementosService {
  constructor(
    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,
    @InjectRepository(Inventarios)
    private readonly inventarioRepository: Repository<Inventarios>,
    @InjectRepository(Sitios)
    private readonly sitioRepository: Repository<Sitios>,
  ) { }

  async create(createElementoDto: CreateElementoDto, filename?: string): Promise<Elementos> {
    const elemento = this.elementoRepository.create({
      ...createElementoDto,
      imagen: filename ?? "defaultPerfil.png",
      fkCategoria: { idCategoria: createElementoDto.fkCategoria },
      fkUnidadMedida: { idUnidad: createElementoDto.fkUnidadMedida },
      fkCaracteristica: createElementoDto.fkCaracteristica
        ? { idCaracteristica: createElementoDto.fkCaracteristica }
        : undefined,

    });

    const nuevoElemento = await this.elementoRepository.save(elemento);
    console.log(filename)

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

  async update(idElemento: number, updateElementoDto: UpdateElementoDto){

    const getElementoById = await this.elementoRepository.findOne({
      where: { idElemento }
    });

    if (!getElementoById) {
      throw new Error(`No se encontró el elemento, el id ${idElemento} no existe`);
    }

    await this.elementoRepository.update(idElemento, updateElementoDto);

    return { status: 200, message: "Datoactualizados con exito", };

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
