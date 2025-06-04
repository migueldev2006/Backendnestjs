import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioFichaDto } from './create-usuario-ficha.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUsuarioFichaDto extends PartialType(CreateUsuarioFichaDto) {

        @IsNumber()
        @IsOptional()
        fkFicha:number

        @IsNumber()
        @IsOptional()
        fkUsuario:number
}
