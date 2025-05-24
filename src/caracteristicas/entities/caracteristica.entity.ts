import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Elementos } from "../../elementos/entities/elemento.entity";


@Entity("caracteristicas", { schema: "public" })
export class Caracteristicas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_caracteristica" })
  idCaracteristica: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", { name: "codigo", nullable: true, length: 255 })
  codigo: string | null;

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

  @ManyToOne(() => Elementos, (elementos) => elementos.caracteristicas)
  @JoinColumn([{ name: "fk_elemento", referencedColumnName: "idElemento" }])
  fkElemento: Elementos;
}
