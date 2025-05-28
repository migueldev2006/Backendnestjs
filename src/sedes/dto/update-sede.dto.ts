import { PartialType } from '@nestjs/mapped-types';
import { CreateSedeDto } from './create-sede.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSedeDto extends PartialType(CreateSedeDto) {
    @IsString()
        @IsOptional()
        nombre:string
}
