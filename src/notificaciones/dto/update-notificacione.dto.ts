import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacioneDto } from './create-notificacione.dto';
import { IsOptional, IsBoolean, IsEnum, IsString, IsObject } from 'class-validator';

export class UpdateNotificacioneDto extends PartialType(
  CreateNotificacioneDto,
) {
}
