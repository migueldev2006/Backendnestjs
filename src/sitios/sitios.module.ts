import { Module } from '@nestjs/common';
import { SitiosService } from './sitios.service';
import { SitiosController } from './sitios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitios } from './entities/sitio.entity';
import { Elementos } from 'src/elementos/entities';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';


@Module({
  controllers: [SitiosController],
  providers: [SitiosService],
  imports: [
    TypeOrmModule.forFeature([Sitios, Elementos, Inventarios]),
  ],
  exports: [TypeOrmModule],
})
export class SitiosModule {}
