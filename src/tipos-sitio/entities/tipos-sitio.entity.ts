import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sitios } from "../../sitios/entities/sitio.entity";

@Entity("tipo_sitios", { schema: "public" })
export class TipoSitios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_tipo" })
  idTipo: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("boolean", { name: "estado", nullable: true })
  estado: boolean | null;

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

  @OneToMany(() => Sitios, (sitios) => sitios.fkTipoSitio)
  sitios: Sitios[];
}
