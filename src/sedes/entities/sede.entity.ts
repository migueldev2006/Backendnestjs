import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Areas } from "../../areas/entities/area.entity";
import { Centros } from "../../centros/entities/centro.entity";

@Entity("sedes", { schema: "public" })
export class Sedes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sede" })
  idSede: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("boolean", { name: "estado", nullable: true })
  estado: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn( {
    name: "updated_at",
    type:"timestamp",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Areas, (areas) => areas.fkSede)
  areas: Areas[];

  @ManyToOne(() => Centros, (centros) => centros.sedes)
  @JoinColumn([{ name: "fk_centro", referencedColumnName: "idCentro" }])
  fkCentro: Centros;
}
