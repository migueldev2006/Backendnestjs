import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposSitioDto } from './create-tipos-sitio.dto';
import { IsBoolean, IsString, MinLength } from "class-validator";

export class UpdateTiposSitioDto extends PartialType(CreateTiposSitioDto) {
    @IsString({ message: "El nombre debe ser un string" })
    @MinLength(5)
    nombre: string;

    @IsBoolean()
    estado: boolean
}
