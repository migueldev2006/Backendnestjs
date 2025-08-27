import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateZapato1756250698273 implements MigrationInterface {
    name = 'CreateZapato1756250698273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "zapatos" ("id_zapato" SERIAL NOT NULL, "marca" character varying(70), "talla" character varying(70), CONSTRAINT "PK_d0362308d1a055807c92606d684" PRIMARY KEY ("id_zapato"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "zapatos"`);
    }

}
