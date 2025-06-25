import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RolPermiso } from "../../rol-permiso/entities/rol-permiso.entity";
import { Rutas } from "../../rutas/entities/ruta.entity";

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

  @UpdateDateColumn({
    name: "updated_at",
    type:"timestamp",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.fkPermiso)
  rolPermisos: RolPermiso[];

  @ManyToOne(() => Rutas, (ruta) => ruta.permisos, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "fk_ruta", referencedColumnName: "idRuta" }])
  fkRuta: Rutas;
}
