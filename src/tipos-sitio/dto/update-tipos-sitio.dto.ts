import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposSitioDto } from './create-tipos-sitio.dto';

export class UpdateTiposSitioDto extends PartialType(CreateTiposSitioDto) {}
