import { Module } from '@nestjs/common';
import { TiposSitioService } from './tipos-sitio.service';
import { TiposSitioController } from './tipos-sitio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSitios } from './entities/tipos-sitio.entity';

@Module({
  controllers: [TiposSitioController],
  providers: [TiposSitioService],
  imports: [TypeOrmModule.forFeature([TipoSitios])],
  exports:[TypeOrmModule]
})
export class TiposSitioModule {}
