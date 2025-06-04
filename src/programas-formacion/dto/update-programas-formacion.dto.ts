import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramasFormacionDto } from './create-programas-formacion.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProgramasFormacionDto extends PartialType(CreateProgramasFormacionDto) {
            @IsString()
            @IsOptional()
            nombre:string
}


