import { Module } from '@nestjs/common';
import { TiposSitioService } from './tipos-sitio.service';
import { TiposSitioController } from './tipos-sitio.controller';

@Module({
  controllers: [TiposSitioController],
  providers: [TiposSitioService],
})
export class TiposSitioModule {}
