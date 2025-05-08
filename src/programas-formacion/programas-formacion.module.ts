import { Module } from '@nestjs/common';
import { ProgramasFormacionService } from './programas-formacion.service';
import { ProgramasFormacionController } from './programas-formacion.controller';

@Module({
  controllers: [ProgramasFormacionController],
  providers: [ProgramasFormacionService],
})
export class ProgramasFormacionModule {}
