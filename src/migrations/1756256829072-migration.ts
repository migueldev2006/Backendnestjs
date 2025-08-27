import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1756256829072 implements MigrationInterface {
    name = 'Migration1756256829072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zapatos" ADD "nombre" character varying(70)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zapatos" DROP COLUMN "nombre"`);
    }

}
