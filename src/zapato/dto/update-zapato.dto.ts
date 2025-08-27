import { PartialType } from '@nestjs/mapped-types';
import { CreateZapatoDto } from './create-zapato.dto';

export class UpdateZapatoDto extends PartialType(CreateZapatoDto) {}
