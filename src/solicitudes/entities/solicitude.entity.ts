import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notificaciones } from "../../notificaciones/entities/notificacione.entity";
import { Inventarios } from "../../inventarios/entities/inventario.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("solicitudes", { schema: "public" })
export class Solicitudes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_solicitud" })
  idSolicitud: number;

  @Column("character varying", {
    name: "descripcion",
    nullable: true,
    length: 205,
  })
  descripcion: string | null;

  @Column("integer", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @Column("boolean", { name: "aceptada", nullable: true })
  aceptada: boolean | null;

  @Column("boolean", { name: "pendiente", nullable: true })
  pendiente: boolean | null;

  @Column("boolean", { name: "rechazada", nullable: true })
  rechazada: boolean | null;

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

  @OneToMany(
    () => Notificaciones,
    (notificaciones) => notificaciones.fkSolicitud
  )
  notificaciones: Notificaciones[];

  @ManyToOne(() => Inventarios, (inventarios) => inventarios.solicitudes)
  @JoinColumn([{ name: "fk_inventario", referencedColumnName: "idInventario" }])
  fkInventario: Inventarios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.solicitudes)
  @JoinColumn([{ name: "fk_usuario", referencedColumnName: "idUsuario" }])
  fkUsuario: Usuarios;
}
