import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadesMedidaDto } from './create-unidades-medida.dto';

export class UpdateUnidadesMedidaDto extends PartialType(CreateUnidadesMedidaDto) {}
