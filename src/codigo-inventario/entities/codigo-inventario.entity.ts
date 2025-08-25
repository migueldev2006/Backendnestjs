import { Inventarios } from "src/inventarios/entities/inventario.entity";
import { Movimientos } from "src/movimientos/entities/movimiento.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("codigo_inventario", { schema: "public" })
export class CodigoInventario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_codigo_inventario" })
  idCodigoInventario: number;

  @Column({type:'text',name:'codigo'})
  codigo:string
  
  @Column({type:'boolean', name:'uso', default:false})
  uso:boolean

  @Column({type:'boolean', name:'baja', default:false})
  baja:boolean

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type:'timestamp',
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Inventarios, (inventario) => inventario.codigos)
  @JoinColumn([{ name: "fk_inventario", referencedColumnName: "idInventario" }])
  fkInventario: Inventarios;

    @ManyToOne(() => Movimientos, (movimiento) => movimiento.codigos, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'fk_movimiento' })
  fkMovimiento: Movimientos;
}


