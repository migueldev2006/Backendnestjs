import {
  Column,
  Entity,
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

  @Column("character varying", {
    name: "href",
    nullable: true,
    length: 205,
  })
  href: string | null;

  @Column("character varying", {
    name: "icono",
    nullable: false,
    length: 205,
  })
  icono: string;

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

  @OneToMany(() => Rutas, (rutas) => rutas.fkModulo)
  rutas: Rutas[];
}
