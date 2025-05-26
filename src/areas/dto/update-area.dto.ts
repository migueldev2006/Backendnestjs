import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
        @IsString()
        @IsOptional()
        nombre:string
}
