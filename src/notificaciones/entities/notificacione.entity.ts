import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";
import { Solicitudes } from "../../solicitudes/entities/solicitude.entity";

@Index("notificaciones_pkey", ["idNotificacion"], { unique: true })
@Entity("notificaciones", { schema: "public" })
export class Notificaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_notificacion" })
  idNotificacion: number;

  @Column("character varying", { name: "titulo", nullable: true, length: 205 })
  titulo: string | null;

  @Column("character varying", { name: "mensaje", nullable: true, length: 205 })
  mensaje: string | null;

  @Column("character varying", { name: "destino", nullable: true, length: 205 })
  destino: string | null;

  @Column("boolean", { name: "leido", nullable: true, default: () => "false" })
  leido: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToOne(() => Movimientos, (movimientos) => movimientos.notificaciones)
  @JoinColumn([{ name: "fk_movimiento", referencedColumnName: "idMovimiento" }])
  fkMovimiento: Movimientos;

  @ManyToOne(() => Solicitudes, (solicitudes) => solicitudes.notificaciones)
  @JoinColumn([{ name: "fk_solicitud", referencedColumnName: "idSolicitud" }])
  fkSolicitud: Solicitudes;
}
