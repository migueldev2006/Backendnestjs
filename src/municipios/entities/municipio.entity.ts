import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Centros } from "../../centros/entities/centro.entity";

@Entity("municipios", { schema: "public" })
export class Municipios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_municipio" })
  idMunicipio: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", {
    name: "departamento",
    nullable: true,
    length: 100,
  })
  departamento: string | null;

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

  @OneToMany(() => Centros, (centros) => centros.fkMunicipio)
  centros: Centros[];
}
