import { Module } from '@nestjs/common';
import { FichasService } from './fichas.service';
import { FichasController } from './fichas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fichas } from './entities/ficha.entity';

@Module({
  controllers: [FichasController],
  providers: [FichasService],
  imports: [TypeOrmModule.forFeature([Fichas])],
  exports:[TypeOrmModule]
})
export class FichasModule {}
