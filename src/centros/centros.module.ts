import { Module } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { CentrosController } from './centros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Centros } from './entities/centro.entity';

@Module({
  controllers: [CentrosController],
  providers: [CentrosService],
  imports: [TypeOrmModule.forFeature([Centros])],
  exports:[TypeOrmModule]
})
export class CentrosModule {}
