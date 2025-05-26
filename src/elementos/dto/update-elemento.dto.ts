import { PartialType } from '@nestjs/mapped-types';
import { CreateElementoDto } from './create-elemento.dto';
import { ElementImage } from '../entities';

export class UpdateElementoDto extends PartialType(CreateElementoDto) {}
