import { PartialType } from '@nestjs/mapped-types';
import { CreatePermisoDto } from './create-permiso.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePermisoDto extends PartialType(CreatePermisoDto) {

    @IsString()
        @IsOptional()
        permiso:string
}
