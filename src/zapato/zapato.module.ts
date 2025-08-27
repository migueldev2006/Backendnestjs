import { Module } from '@nestjs/common';
import { ZapatoService } from './zapato.service';
import { ZapatoController } from './zapato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zapatos } from './entities/zapato.entity';

@Module({
  controllers: [ZapatoController],
  providers: [ZapatoService],
    imports: [
      TypeOrmModule.forFeature([Zapatos]),
    ],
    exports: [TypeOrmModule],
})
export class ZapatoModule {}
