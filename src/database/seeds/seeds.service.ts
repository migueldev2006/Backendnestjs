import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulos } from 'src/modulos/entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedsService {
    constructor(
        @InjectRepository(Modulos)
        private readonly modulosRepository: Repository<Modulos>
    ) { }

    async seed() {
        const modules = [
            {
                idModulo: 1,
                nombre: "Admin",
                icono: "UserIcon",
                estado: true
            },

            {
                idModulo: 2,
                nombre: "Bodega",
                icono: "ArchiveBoxIcon",
                estado: true
            },
            {
                idModulo: 3,
                nombre: "Reportes",
                icono: "DocumentChartBarIcon",
                estado: true
            }
        ];

        for (const module of modules) {
            const exists = await this.modulosRepository.findOneBy({ idModulo: module.idModulo })
            if (!exists) await this.modulosRepository.save(module);
        }
        console.log("Seeding completado!");
    }
}
