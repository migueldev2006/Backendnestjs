import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permisos } from "../../permisos/entities/permiso.entity";
import { Rutas } from "../../rutas/entities/ruta.entity";

@Entity("modulos", { schema: "public" })
export class Modulos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_modulo" })
  idModulo: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", {
    name: "descripcion",
    nullable: true,
    length: 205,
  })
  descripcion: string | null;

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

  @Column("boolean", { name: "estado", nullable: true })
  estado: boolean | null;

  @OneToMany(() => Permisos, (permisos) => permisos.fkModulo)
  permisos: Permisos[];

  @OneToMany(() => Rutas, (rutas) => rutas.fkModulo)
  rutas: Rutas[];
}
