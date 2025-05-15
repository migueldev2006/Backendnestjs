import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Modulos } from "../../modulos/entities/modulo.entity";
import { RolPermiso } from "../../rol-permiso/entities/rol-permiso.entity";

@Entity("permisos", { schema: "public" })
export class Permisos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_permiso" })
  idPermiso: number;

  @Column("character varying", { name: "permiso", nullable: true, length: 100 })
  permiso: string | null;

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

  @ManyToOne(() => Modulos, (modulos) => modulos.permisos)
  @JoinColumn([{ name: "fk_modulo", referencedColumnName: "idModulo" }])
  fkModulo: Modulos;

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.fkPermiso)
  rolPermisos: RolPermiso[];
}
