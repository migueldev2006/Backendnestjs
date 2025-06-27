import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulos } from 'src/modulos/entities/modulo.entity';
import { SeedsService } from './seeds.service';
import { SeedsCommand } from './seeds.command';

@Module({
    imports: [TypeOrmModule.forFeature([Modulos])],
    providers: [SeedsService, SeedsCommand],
    exports: [SeedsService]
})
export class SeedsModule {}
