import { Module } from '@nestjs/common';
import { ProgramasFormacionService } from './programas-formacion.service';
import { ProgramasFormacionController } from './programas-formacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramasFormacion } from './entities/programas-formacion.entity';

@Module({
  controllers: [ProgramasFormacionController],
  providers: [ProgramasFormacionService],
    imports: [TypeOrmModule.forFeature([ProgramasFormacion])],
    exports:[TypeOrmModule]
})
export class ProgramasFormacionModule {}
