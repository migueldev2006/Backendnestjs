import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Modulos } from "../../modulos/entities/modulo.entity";
import { Permisos } from "../../permisos/entities/permiso.entity";

@Entity("rutas", { schema: "public" })
export class Rutas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_ruta" })
  idRuta: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 205 })
  nombre: string | null;

  @Column("character varying", {
    name: "descripcion",
    nullable: true,
    length: 205,
  })
  descripcion: string | null;

  @Column("character varying", {
    name: "href",
    nullable: false,
    length: 205,
  })
  href: string;

  @Column("character varying", {
    name: "icono",
    nullable: true,
    length: 205,
  })
  icono: string;

  @Column("boolean", { name: "listed", nullable: false })
  listed: boolean;

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

  @ManyToOne(() => Modulos, (modulos) => modulos.rutas)
  @JoinColumn([{ name: "fk_modulo", referencedColumnName: "idModulo" }])
  fkModulo: Modulos;

  @OneToMany(() => Permisos, (permiso) => permiso.fkRuta)
  permisos: Permisos[];
}
