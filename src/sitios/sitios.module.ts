import { Module } from '@nestjs/common';
import { SitiosService } from './sitios.service';
import { SitiosController } from './sitios.controller';

@Module({
  controllers: [SitiosController],
  providers: [SitiosService],
})
export class SitiosModule {}
