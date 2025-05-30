import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolPermiso } from "../../rol-permiso/entities/rol-permiso.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_rol" })
  idRol: number;

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

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.fkRol)
  rolPermisos: RolPermiso[];

  @OneToMany(() => Usuarios, (usuarios) => usuarios.fkRol)
  usuarios: Usuarios[];
}
