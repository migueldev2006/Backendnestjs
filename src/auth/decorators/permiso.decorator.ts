import { SetMetadata } from '@nestjs/common';

export const Permiso = (permiso: number) => SetMetadata('permiso',permiso);