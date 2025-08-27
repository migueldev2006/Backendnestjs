import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1756302615686 implements MigrationInterface {
    name = 'Migration1756302615686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "municipios" ("id_municipio" SERIAL NOT NULL, "nombre" character varying(70), "departamento" character varying(100), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da5d86d82419fc6467cd4f3fa83" PRIMARY KEY ("id_municipio"))`);
        await queryRunner.query(`CREATE TABLE "centros" ("id_centro" SERIAL NOT NULL, "nombre" character varying(70), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_municipio" integer, CONSTRAINT "PK_93d07f4fb0a5e3876897b2bce66" PRIMARY KEY ("id_centro"))`);
        await queryRunner.query(`CREATE TABLE "sedes" ("id_sede" SERIAL NOT NULL, "nombre" character varying(70), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_centro" integer, CONSTRAINT "PK_401bce17f4f7abe8670e9ece642" PRIMARY KEY ("id_sede"))`);
        await queryRunner.query(`CREATE TABLE "usuario_ficha" ("id_usuario_ficha" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_ficha" integer, "fk_usuario" integer, CONSTRAINT "PK_072265536cf170c9073957971cf" PRIMARY KEY ("id_usuario_ficha"))`);
        await queryRunner.query(`CREATE TABLE "fichas" ("id_ficha" SERIAL NOT NULL, "codigo_ficha" integer NOT NULL, "estado" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_programa" integer, CONSTRAINT "PK_857eaea7142102a2f3d223e12c5" PRIMARY KEY ("id_ficha"))`);
        await queryRunner.query(`CREATE TABLE "programas_formacion" ("id_programa" SERIAL NOT NULL, "nombre" character varying(70) NOT NULL, "estado" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_area" integer, CONSTRAINT "PK_b0d49e5d3ad80a48b383d459301" PRIMARY KEY ("id_programa"))`);
        await queryRunner.query(`CREATE TABLE "caracteristicas" ("id_caracteristica" SERIAL NOT NULL, "nombre" character varying(70), "simbolo" character varying(50), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_52e73803f4f7ca4fa6ef0954cba" PRIMARY KEY ("id_caracteristica"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id_categoria" SERIAL NOT NULL, "nombre" character varying(70), "codigo_unpsc" text, "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_04bae980e284752e914bce1cbc7" PRIMARY KEY ("id_categoria"))`);
        await queryRunner.query(`CREATE TABLE "unidades_medida" ("id_unidad" SERIAL NOT NULL, "nombre" character varying(70) NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca39afd476a07a87d3c3faf916c" PRIMARY KEY ("id_unidad"))`);
        await queryRunner.query(`CREATE TABLE "elementos" ("id_elemento" SERIAL NOT NULL, "nombre" character varying(70), "descripcion" character varying(205), "perecedero" boolean, "no_perecedero" boolean, "estado" boolean, "fecha_vencimiento" date, "baja" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "imagen" character varying(255), "fk_caracteristica" integer, "fk_categoria" integer, "fk_unidad_medida" integer, CONSTRAINT "PK_1d2dba8c68f03b6d62478514622" PRIMARY KEY ("id_elemento"))`);
        await queryRunner.query(`CREATE TABLE "tipo_movimientos" ("id_tipo" SERIAL NOT NULL, "nombre" character varying(70), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_44b7e6b22ba4d09d3868fc9c388" PRIMARY KEY ("id_tipo"))`);
        await queryRunner.query(`CREATE TABLE "codigo_inventario" ("id_codigo_inventario" SERIAL NOT NULL, "codigo" text NOT NULL, "uso" boolean NOT NULL DEFAULT false, "baja" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_inventario" integer, "fk_movimiento" integer, CONSTRAINT "PK_ffdecb48e8c3f594845b0ab4e56" PRIMARY KEY ("id_codigo_inventario"))`);
        await queryRunner.query(`CREATE TABLE "movimientos" ("id_movimiento" SERIAL NOT NULL, "descripcion" character varying(205), "cantidad" integer, "hora_ingreso" TIME, "hora_salida" TIME, "aceptado" boolean, "en_proceso" boolean, "cancelado" boolean, "devolutivo" boolean, "no_devolutivo" boolean, "fecha_devolucion" date, "lugar_destino" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_inventario" integer, "fk_sitio" integer, "fk_tipo_movimiento" integer, "fk_usuario" integer, CONSTRAINT "PK_3883c5e72c07666baf33f846f8c" PRIMARY KEY ("id_movimiento"))`);
        await queryRunner.query(`CREATE TABLE "inventarios" ("id_inventario" SERIAL NOT NULL, "stock" integer NOT NULL DEFAULT '0', "estado" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_elemento" integer, "fk_sitio" integer, CONSTRAINT "PK_2c4442a91d7530d5b410d640d8c" PRIMARY KEY ("id_inventario"))`);
        await queryRunner.query(`CREATE TABLE "tipo_sitios" ("id_tipo" SERIAL NOT NULL, "nombre" character varying(70), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_22a8489e7e3a66f3b1ebcf31f1a" PRIMARY KEY ("id_tipo"))`);
        await queryRunner.query(`CREATE TABLE "sitios" ("id_sitio" SERIAL NOT NULL, "nombre" character varying(70), "persona_encargada" character varying(70), "ubicacion" character varying(205), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_area" integer, "fk_tipo_sitio" integer, CONSTRAINT "PK_726f70836f94825b76c974b5d24" PRIMARY KEY ("id_sitio"))`);
        await queryRunner.query(`CREATE TABLE "areas" ("id_area" SERIAL NOT NULL, "nombre" character varying(70) NOT NULL, "estado" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_sede" integer, "fk_usuario" integer, CONSTRAINT "PK_9d2a9f5b563d6a8a9703a8fa9cd" PRIMARY KEY ("id_area"))`);
        await queryRunner.query(`CREATE TABLE "modulos" ("id_modulo" SERIAL NOT NULL, "nombre" character varying(70), "descripcion" character varying(205), "href" character varying(205), "icono" character varying(205) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "estado" boolean, CONSTRAINT "PK_68ad50fa332064a72e31fcdf87a" PRIMARY KEY ("id_modulo"))`);
        await queryRunner.query(`CREATE TABLE "rutas" ("id_ruta" SERIAL NOT NULL, "nombre" character varying(205), "descripcion" character varying(205), "href" character varying(205) NOT NULL, "icono" character varying(205), "listed" boolean NOT NULL, "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_modulo" integer, CONSTRAINT "PK_5969d8e88a11612682925e9275a" PRIMARY KEY ("id_ruta"))`);
        await queryRunner.query(`CREATE TABLE "permisos" ("id_permiso" SERIAL NOT NULL, "permiso" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_ruta" integer, CONSTRAINT "PK_76e2dbb965cd631705b6caaf698" PRIMARY KEY ("id_permiso"))`);
        await queryRunner.query(`CREATE TABLE "rol_permiso" ("id_rol_permiso" SERIAL NOT NULL, "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_permiso" integer, "fk_rol" integer, CONSTRAINT "PK_151312cfdb886f6d9dc19f9ccfd" PRIMARY KEY ("id_rol_permiso"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id_rol" SERIAL NOT NULL, "nombre" character varying(70), "estado" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_25f8d4161f00a1dd1cbe5068695" PRIMARY KEY ("id_rol"))`);
        await queryRunner.query(`CREATE TABLE "notificaciones" ("id_notificacion" SERIAL NOT NULL, "titulo" character varying(205) NOT NULL, "mensaje" character varying(500), "leido" boolean NOT NULL DEFAULT false, "requiereAccion" boolean NOT NULL DEFAULT false, "estado" character varying(50), "data" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_usuario" integer, CONSTRAINT "PK_ff498b8eb6b226a9fc52889ddac" PRIMARY KEY ("id_notificacion"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id_usuario" SERIAL NOT NULL, "documento" integer, "nombre" character varying(70), "apellido" character varying(70), "edad" integer, "telefono" character varying(15), "correo" character varying(70), "estado" boolean, "cargo" character varying(70), "password" character varying(60), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "perfil" character varying(255), "fk_rol" integer, CONSTRAINT "UQ_604e2077971f192d85cffb5c437" UNIQUE ("documento"), CONSTRAINT "PK_dfe59db369749f9042499fd8107" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`ALTER TABLE "centros" ADD CONSTRAINT "FK_fc96811e83c712661c334669764" FOREIGN KEY ("fk_municipio") REFERENCES "municipios"("id_municipio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sedes" ADD CONSTRAINT "FK_8947f83ead69974ad061988eaf8" FOREIGN KEY ("fk_centro") REFERENCES "centros"("id_centro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_ficha" ADD CONSTRAINT "FK_bc0effe2fba9545039f7d43d7bc" FOREIGN KEY ("fk_ficha") REFERENCES "fichas"("id_ficha") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_ficha" ADD CONSTRAINT "FK_8a9380c9d7c033aad50933538ce" FOREIGN KEY ("fk_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fichas" ADD CONSTRAINT "FK_9a65db71203b4f3d432947e2021" FOREIGN KEY ("fk_programa") REFERENCES "programas_formacion"("id_programa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "programas_formacion" ADD CONSTRAINT "FK_c3a8a052ae45f557e9e33a5b68a" FOREIGN KEY ("fk_area") REFERENCES "areas"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_9307c5cdfa801c78b37b51fd5bc" FOREIGN KEY ("fk_caracteristica") REFERENCES "caracteristicas"("id_caracteristica") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_ee71b54709343b5af18d62a853e" FOREIGN KEY ("fk_categoria") REFERENCES "categorias"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elementos" ADD CONSTRAINT "FK_ea006bdbbdba2d09b7ea278eb4c" FOREIGN KEY ("fk_unidad_medida") REFERENCES "unidades_medida"("id_unidad") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_0fe8d1c31f364b07cd844884627" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" ADD CONSTRAINT "FK_740d091fe48f0f2ed53ca6e7d30" FOREIGN KEY ("fk_movimiento") REFERENCES "movimientos"("id_movimiento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_6f9db72a8aced37f5f40acdb59c" FOREIGN KEY ("fk_inventario") REFERENCES "inventarios"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_c9f6b1eeb83b7abc7c6a41f0cf6" FOREIGN KEY ("fk_sitio") REFERENCES "sitios"("id_sitio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_e9a4e4a3031b2fb11c730b81cbc" FOREIGN KEY ("fk_tipo_movimiento") REFERENCES "tipo_movimientos"("id_tipo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_9e4cbcfb59dc5e94a41bd5236eb" FOREIGN KEY ("fk_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD CONSTRAINT "FK_192e705da5dfec791d09b16be29" FOREIGN KEY ("fk_elemento") REFERENCES "elementos"("id_elemento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventarios" ADD CONSTRAINT "FK_80aa7d1c605be0d8281f3127f78" FOREIGN KEY ("fk_sitio") REFERENCES "sitios"("id_sitio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD CONSTRAINT "FK_505578750a4cd8db16e9c282a4a" FOREIGN KEY ("fk_area") REFERENCES "areas"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sitios" ADD CONSTRAINT "FK_00c011c095cf947d6989ac14b81" FOREIGN KEY ("fk_tipo_sitio") REFERENCES "tipo_sitios"("id_tipo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_ffc41bc0decae9fabdec083542b" FOREIGN KEY ("fk_sede") REFERENCES "sedes"("id_sede") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_cbe3c956f0a746b2c9947bad277" FOREIGN KEY ("fk_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rutas" ADD CONSTRAINT "FK_a97abdad35a72da8da3be972021" FOREIGN KEY ("fk_modulo") REFERENCES "modulos"("id_modulo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permisos" ADD CONSTRAINT "FK_201e212c6b7ce88de3b1d9d0799" FOREIGN KEY ("fk_ruta") REFERENCES "rutas"("id_ruta") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" ADD CONSTRAINT "FK_a06c4f160e4c589da93f7c191bf" FOREIGN KEY ("fk_permiso") REFERENCES "permisos"("id_permiso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" ADD CONSTRAINT "FK_ba15da702a0f5d500588c597a9d" FOREIGN KEY ("fk_rol") REFERENCES "roles"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificaciones" ADD CONSTRAINT "FK_77a0ebfb81a5cb8e3852c75e0a8" FOREIGN KEY ("fk_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_2debd80fc8ffea2584356b81313" FOREIGN KEY ("fk_rol") REFERENCES "roles"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_2debd80fc8ffea2584356b81313"`);
        await queryRunner.query(`ALTER TABLE "notificaciones" DROP CONSTRAINT "FK_77a0ebfb81a5cb8e3852c75e0a8"`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" DROP CONSTRAINT "FK_ba15da702a0f5d500588c597a9d"`);
        await queryRunner.query(`ALTER TABLE "rol_permiso" DROP CONSTRAINT "FK_a06c4f160e4c589da93f7c191bf"`);
        await queryRunner.query(`ALTER TABLE "permisos" DROP CONSTRAINT "FK_201e212c6b7ce88de3b1d9d0799"`);
        await queryRunner.query(`ALTER TABLE "rutas" DROP CONSTRAINT "FK_a97abdad35a72da8da3be972021"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_cbe3c956f0a746b2c9947bad277"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_ffc41bc0decae9fabdec083542b"`);
        await queryRunner.query(`ALTER TABLE "sitios" DROP CONSTRAINT "FK_00c011c095cf947d6989ac14b81"`);
        await queryRunner.query(`ALTER TABLE "sitios" DROP CONSTRAINT "FK_505578750a4cd8db16e9c282a4a"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP CONSTRAINT "FK_80aa7d1c605be0d8281f3127f78"`);
        await queryRunner.query(`ALTER TABLE "inventarios" DROP CONSTRAINT "FK_192e705da5dfec791d09b16be29"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_9e4cbcfb59dc5e94a41bd5236eb"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_e9a4e4a3031b2fb11c730b81cbc"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_c9f6b1eeb83b7abc7c6a41f0cf6"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_6f9db72a8aced37f5f40acdb59c"`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" DROP CONSTRAINT "FK_740d091fe48f0f2ed53ca6e7d30"`);
        await queryRunner.query(`ALTER TABLE "codigo_inventario" DROP CONSTRAINT "FK_0fe8d1c31f364b07cd844884627"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP CONSTRAINT "FK_ea006bdbbdba2d09b7ea278eb4c"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP CONSTRAINT "FK_ee71b54709343b5af18d62a853e"`);
        await queryRunner.query(`ALTER TABLE "elementos" DROP CONSTRAINT "FK_9307c5cdfa801c78b37b51fd5bc"`);
        await queryRunner.query(`ALTER TABLE "programas_formacion" DROP CONSTRAINT "FK_c3a8a052ae45f557e9e33a5b68a"`);
        await queryRunner.query(`ALTER TABLE "fichas" DROP CONSTRAINT "FK_9a65db71203b4f3d432947e2021"`);
        await queryRunner.query(`ALTER TABLE "usuario_ficha" DROP CONSTRAINT "FK_8a9380c9d7c033aad50933538ce"`);
        await queryRunner.query(`ALTER TABLE "usuario_ficha" DROP CONSTRAINT "FK_bc0effe2fba9545039f7d43d7bc"`);
        await queryRunner.query(`ALTER TABLE "sedes" DROP CONSTRAINT "FK_8947f83ead69974ad061988eaf8"`);
        await queryRunner.query(`ALTER TABLE "centros" DROP CONSTRAINT "FK_fc96811e83c712661c334669764"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "notificaciones"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "rol_permiso"`);
        await queryRunner.query(`DROP TABLE "permisos"`);
        await queryRunner.query(`DROP TABLE "rutas"`);
        await queryRunner.query(`DROP TABLE "modulos"`);
        await queryRunner.query(`DROP TABLE "areas"`);
        await queryRunner.query(`DROP TABLE "sitios"`);
        await queryRunner.query(`DROP TABLE "tipo_sitios"`);
        await queryRunner.query(`DROP TABLE "inventarios"`);
        await queryRunner.query(`DROP TABLE "movimientos"`);
        await queryRunner.query(`DROP TABLE "codigo_inventario"`);
        await queryRunner.query(`DROP TABLE "tipo_movimientos"`);
        await queryRunner.query(`DROP TABLE "elementos"`);
        await queryRunner.query(`DROP TABLE "unidades_medida"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "caracteristicas"`);
        await queryRunner.query(`DROP TABLE "programas_formacion"`);
        await queryRunner.query(`DROP TABLE "fichas"`);
        await queryRunner.query(`DROP TABLE "usuario_ficha"`);
        await queryRunner.query(`DROP TABLE "sedes"`);
        await queryRunner.query(`DROP TABLE "centros"`);
        await queryRunner.query(`DROP TABLE "municipios"`);
    }

}
