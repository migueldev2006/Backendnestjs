import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadesMedidaDto } from './create-unidades-medida.dto';
import { IsString } from 'class-validator';

export class UpdateUnidadesMedidaDto extends PartialType(CreateUnidadesMedidaDto) {
    @IsString()
    nombre?: string | undefined;
}
