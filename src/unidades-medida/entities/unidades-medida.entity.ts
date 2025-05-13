import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Elementos } from "../../elementos/entities/elemento.entity";

@Entity("unidades_medida", { schema: "public" })
export class UnidadesMedida {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_unidad" })
  idUnidad: number;

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

  @OneToMany(() => Elementos, (elementos) => elementos.fkUnidadMedida)
  elementos: Elementos[];
}
