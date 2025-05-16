import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitudes } from './entities/solicitude.entity';

@Module({
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
  imports: [TypeOrmModule.forFeature([Solicitudes])],
  exports:[TypeOrmModule]
})
export class SolicitudesModule {}
