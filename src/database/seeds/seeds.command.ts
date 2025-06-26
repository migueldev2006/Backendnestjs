import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Injectable()
export class SeedsCommand {
    constructor(private readonly seedsService: SeedsService) {}

    @Command({
        command: "seed:database",
        describe: "Poblar la base de datos con datos defecto"
    })
    async run() {
        await this.seedsService.seed();
        console.log("Base de datos poblada con éxito!");
    }
}