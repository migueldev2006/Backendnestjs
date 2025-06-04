import { PartialType } from '@nestjs/mapped-types';
import { CreateCodigoInventarioDto } from './create-codigo-inventario.dto';

export class UpdateCodigoInventarioDto extends PartialType(CreateCodigoInventarioDto) {}
