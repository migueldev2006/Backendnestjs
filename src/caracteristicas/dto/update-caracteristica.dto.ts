import { PartialType } from '@nestjs/mapped-types';
import { CreateCaracteristicaDto } from './create-caracteristica.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateCaracteristicaDto extends PartialType(CreateCaracteristicaDto) {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(2)
    nombre: string;
}
