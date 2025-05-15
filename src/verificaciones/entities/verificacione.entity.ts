import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sitios } from "../../sitios/entities/sitio.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("verificaciones", { schema: "public" })
export class Verificaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_verificacion" })
  idVerificacion: number;

  @Column("character varying", {
    name: "persona_encargada",
    nullable: true,
    length: 70,
  })
  personaEncargada: string | null;

  @Column("time without time zone", { name: "hora_ingreso", nullable: true })
  horaIngreso: string | null;

  @Column("time without time zone", { name: "hora_fin", nullable: true })
  horaFin: string | null;

  @Column("character varying", {
    name: "observaciones",
    nullable: true,
    length: 255,
  })
  observaciones: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Sitios, (sitios) => sitios.verificaciones)
  @JoinColumn([{ name: "fk_sitio", referencedColumnName: "idSitio" }])
  fkSitio: Sitios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.verificaciones)
  @JoinColumn([{ name: "fk_usuario", referencedColumnName: "idUsuario" }])
  fkUsuario: Usuarios;
}
