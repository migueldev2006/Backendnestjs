import { Module } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipios } from './entities/municipio.entity';

@Module({
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
  imports: [TypeOrmModule.forFeature([Municipios])],
  exports:[TypeOrmModule]
})
export class MunicipiosModule {}
