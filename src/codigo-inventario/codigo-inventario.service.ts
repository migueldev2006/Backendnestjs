import { Injectable } from '@nestjs/common';
import { CreateCodigoInventarioDto } from './dto/create-codigo-inventario.dto';
import { UpdateCodigoInventarioDto } from './dto/update-codigo-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigoInventario } from './entities/codigo-inventario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodigoInventarioService {
  constructor(
    @InjectRepository(CodigoInventario)
    private readonly codigoRepository:Repository<CodigoInventario>
  ){}
  async create(createCodigoInventarioDto: CreateCodigoInventarioDto): Promise<CodigoInventario>{
    const codigo = this.codigoRepository.create({
      ...createCodigoInventarioDto,
      fkInventario:{idInventario:createCodigoInventarioDto.fkInventario}
    });

    return await this.codigoRepository.save(codigo);
  }

  async findAll():Promise<CodigoInventario[]> {
    return await this.codigoRepository.find()
  }

  async findOne(idCodigoIventario: number):Promise<CodigoInventario | null> {
    const getCodigoById = await this.codigoRepository.findOneBy({idCodigoIventario});

    if(!getCodigoById){
      throw new Error(`No se encuentra el codigo con el id ${idCodigoIventario}`)
    }

    return getCodigoById;
  }

  async update(idCodigoIventario: number, updateCodigoInventarioDto: UpdateCodigoInventarioDto) {
    const getCodigoById = await this.codigoRepository.findOneBy({idCodigoIventario})

    if (!getCodigoById) {
      throw new Error(`No se encontro el codigo correspondiente a este id`)
    }

    await this.codigoRepository.update(idCodigoIventario,{
      codigo:updateCodigoInventarioDto.codigo,
      estado:updateCodigoInventarioDto.estado
    })
    const updatedCodigo = await this.codigoRepository.save(getCodigoById)
    return updatedCodigo
  }

  

}
