import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificacioneDto } from './create-verificacione.dto';

export class UpdateVerificacioneDto extends PartialType(CreateVerificacioneDto) {}
