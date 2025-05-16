import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Areas } from './entities/area.entity';

@Module({
  controllers: [AreasController],
  providers: [AreasService],
  imports: [TypeOrmModule.forFeature([Areas])],
  exports: [TypeOrmModule],
})
export class AreasModule {}
