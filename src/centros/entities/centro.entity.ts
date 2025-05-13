import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipios } from "../../municipios/entities/municipio.entity";
import { Sedes } from "../../sedes/entities/sede.entity";

@Entity("centros", { schema: "public" })
export class Centros {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_centro" })
  idCentro: number;

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

  @ManyToOne(() => Municipios, (municipios) => municipios.centros)
  @JoinColumn([{ name: "fk_municipio", referencedColumnName: "idMunicipio" }])
  fkMunicipio: Municipios;

  @OneToMany(() => Sedes, (sedes) => sedes.fkCentro)
  sedes: Sedes[];
}
