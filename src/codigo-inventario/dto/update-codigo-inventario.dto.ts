import { PartialType } from '@nestjs/mapped-types';
import { CreateCodigoInventarioDto } from './create-codigo-inventario.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCodigoInventarioDto extends PartialType(CreateCodigoInventarioDto) {
    @IsString()
    @IsOptional()
    codigo?: string
    
    @IsString()
    @IsOptional()
    estado:boolean
}
