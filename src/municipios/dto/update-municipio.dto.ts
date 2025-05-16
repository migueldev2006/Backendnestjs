import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipioDto } from './create-municipio.dto';
import { IsBoolean, IsString, MinLength } from "class-validator";

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsString({ message: "El departamento debe ser string" })
    departamento: string;
}
