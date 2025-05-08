import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramasFormacionDto } from './create-programas-formacion.dto';

export class UpdateProgramasFormacionDto extends PartialType(CreateProgramasFormacionDto) {}
