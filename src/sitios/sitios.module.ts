import { Module } from '@nestjs/common';
import { SitiosService } from './sitios.service';
import { SitiosController } from './sitios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitios } from './entities/sitio.entity';

@Module({
  controllers: [SitiosController],
  providers: [SitiosService],
  imports: [TypeOrmModule.forFeature([Sitios])],
  exports:[TypeOrmModule]
})
export class SitiosModule {}
