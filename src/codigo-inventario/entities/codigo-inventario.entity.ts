import { Inventarios } from "src/inventarios/entities/inventario.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("codigo_inventario", { schema: "public" })
export class CodigoInventario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_verificacion" })
  idCodigoIventario: number;

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

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Inventarios, (inventario) => inventario.codigos)
  @JoinColumn([{ name: "fk_inventario", referencedColumnName: "idInventario" }])
  fkInventario: Inventarios;

}

