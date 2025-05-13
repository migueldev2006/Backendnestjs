import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Areas } from "../../areas/entities/area.entity";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";
import { Solicitudes } from "../../solicitudes/entities/solicitude.entity";
import { UsuarioFicha } from "../../usuario-ficha/entities/usuario-ficha.entity";
import { Roles } from "../../roles/entities/role.entity";
import { Verificaciones } from "../../verificaciones/entities/verificacione.entity";

@Index("usuarios_pkey", ["idUsuario"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("integer", { name: "documento", nullable: true, unique: true })
  documento: number | null;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", { name: "apellido", nullable: true, length: 70 })
  apellido: string | null;

  @Column("integer", { name: "edad", nullable: true })
  edad: number | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 15 })
  telefono: string | null;

  @Column("character varying", { name: "correo", nullable: true, length: 70 })
  correo: string | null;

  @Column("boolean", { name: "estado", nullable: true })
  estado: boolean | null;

  @Column("character varying", { name: "cargo", nullable: true, length: 70 })
  cargo: string | null;

  @Column("character varying", { name: "password", nullable: true, length: 60 })
  password: string | null;

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

  @Column("character varying", { name: "perfil", nullable: true, length: 255 })
  perfil: string | null;

  @OneToMany(() => Areas, (areas) => areas.fkUsuario)
  areas: Areas[];

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkUsuario)
  movimientos: Movimientos[];

  @OneToMany(() => Solicitudes, (solicitudes) => solicitudes.fkUsuario)
  solicitudes: Solicitudes[];

  @OneToMany(() => UsuarioFicha, (usuarioFicha) => usuarioFicha.fkUsuario)
  usuarioFichas: UsuarioFicha[];

  @ManyToOne(() => Roles, (roles) => roles.usuarios)
  @JoinColumn([{ name: "fk_rol", referencedColumnName: "idRol" }])
  fkRol: Roles;

  @OneToMany(() => Verificaciones, (verificaciones) => verificaciones.fkUsuario)
  verificaciones: Verificaciones[];
}
