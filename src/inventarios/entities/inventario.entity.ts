import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Elementos } from "../../elementos/entities/elemento.entity";
import { Sitios } from "../../sitios/entities/sitio.entity";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";
import { Solicitudes } from "../../solicitudes/entities/solicitude.entity";

@Entity("inventarios", { schema: "public" })
export class Inventarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_inventario" })
  idInventario: number;

  @Column("integer", { name: "stock", nullable: true })
  stock: number | null;

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

  @ManyToOne(() => Elementos, (elementos) => elementos.inventarios)
  @JoinColumn([{ name: "fk_elemento", referencedColumnName: "idElemento" }])
  fkElemento: Elementos;

  @ManyToOne(() => Sitios, (sitios) => sitios.inventarios)
  @JoinColumn([{ name: "fk_sitio", referencedColumnName: "idSitio" }])
  fkSitio: Sitios;

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkInventario)
  movimientos: Movimientos[];

  @OneToMany(() => Solicitudes, (solicitudes) => solicitudes.fkInventario)
  solicitudes: Solicitudes[];
}
