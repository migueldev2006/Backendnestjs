import { PartialType } from '@nestjs/mapped-types';
import { CreateCentroDto } from './create-centro.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateCentroDto extends PartialType(CreateCentroDto) {
    
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;
}
