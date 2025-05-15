import { Module } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { SedesController } from './sedes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sedes } from './entities/sede.entity';

@Module({
  controllers: [SedesController],
  providers: [SedesService],
  imports: [TypeOrmModule.forFeature([Sedes])],
  exports:[TypeOrmModule]
})
export class SedesModule {}
