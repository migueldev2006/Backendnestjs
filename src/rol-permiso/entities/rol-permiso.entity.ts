import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permisos } from "../../permisos/entities/permiso.entity";
import { Roles } from "../../roles/entities/role.entity";

@Entity("rol_permiso", { schema: "public" })
export class RolPermiso {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_rol_permiso" })
  idRolPermiso: number;

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

  @ManyToOne(() => Permisos, (permisos) => permisos.rolPermisos)
  @JoinColumn([{ name: "fk_permiso", referencedColumnName: "idPermiso" }])
  fkPermiso: Permisos;

  @ManyToOne(() => Roles, (roles) => roles.rolPermisos)
  @JoinColumn([{ name: "fk_rol", referencedColumnName: "idRol" }])
  fkRol: Roles;
}
