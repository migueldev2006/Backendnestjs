import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsObject,
  IsInt,
} from 'class-validator';

export class CreateNotificacioneDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  mensaje?: string;

  @IsString()
  @IsOptional()
  destino?: string; // puede ser email, id usuario, etc.

  @IsBoolean()
  @IsOptional()
  leido?: boolean;

  @IsBoolean()
  @IsOptional()
  requiereAccion?: boolean;

  @IsEnum(['pendiente', 'aceptado', 'rechazado'], {
    message: 'estado debe ser pendiente, aceptado o rechazado',
  })
  @IsOptional()
  estado?: 'pendiente' | 'aceptado' | 'rechazado';

  @IsObject()
  @IsOptional()
  data?: any; // datos adicionales

  @IsInt()
  fkUsuario: number; // FK al usuario que recibe la notificación
}
