import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";

@Entity("tipo_movimientos", { schema: "public" })
export class TipoMovimientos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_tipo" })
  idTipo: number;

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

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkTipoMovimiento)
  movimientos: Movimientos[];
}
