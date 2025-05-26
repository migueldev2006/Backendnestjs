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
import { Fichas } from "../../fichas/entities/ficha.entity";
import { Areas } from "../../areas/entities/area.entity";

@Entity("programas_formacion", { schema: "public" })
export class ProgramasFormacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_programa" })
  idPrograma: number;

  @Column("character varying", { name: "nombre", length: 70 })
  nombre: string;

  @Column("boolean", { name: "estado", default: true })
  estado: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type:'timestamp',
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Fichas, (fichas) => fichas.fkPrograma)
  fichas: Fichas[];

  @ManyToOne(() => Areas, (areas) => areas.programasFormacions)
  @JoinColumn([{ name: "fk_area", referencedColumnName: "idArea" }])
  fkArea: Areas;
}
