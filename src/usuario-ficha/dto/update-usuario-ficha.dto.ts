import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioFichaDto } from './create-usuario-ficha.dto';

export class UpdateUsuarioFichaDto extends PartialType(CreateUsuarioFichaDto) {}
