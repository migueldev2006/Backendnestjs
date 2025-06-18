import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Inventarios } from "../../inventarios/entities/inventario.entity";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";
import { Areas } from "../../areas/entities/area.entity";
import { TipoSitios } from "../../tipos-sitio/entities/tipos-sitio.entity";
import { Verificaciones } from "../../verificaciones/entities/verificacione.entity";

@Entity("sitios", { schema: "public" })
export class Sitios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sitio" })
  idSitio: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", {
    name: "persona_encargada",
    nullable: true,
    length: 70,
  })
  personaEncargada: string | null;

  @Column("character varying", {
    name: "ubicacion",
    nullable: true,
    length: 205,
  })
  ubicacion: string | null;

  @Column("boolean", { name: "estado", nullable: true })
  estado: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn( {
    name: "updated_at",
    type:"timestamp",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Inventarios, (inventarios) => inventarios.fkSitio)
  inventarios: Inventarios[];

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkSitio)
  movimientos: Movimientos[];

  @ManyToOne(() => Areas, (areas) => areas.sitios)
  @JoinColumn([{ name: "fk_area", referencedColumnName: "idArea" }])
  fkArea: Areas;

  @ManyToOne(() => TipoSitios, (tipoSitios) => tipoSitios.sitios)
  @JoinColumn([{ name: "fk_tipo_sitio", referencedColumnName: "idTipo" }])
  fkTipoSitio: TipoSitios;

  @OneToMany(() => Verificaciones, (verificaciones) => verificaciones.fkSitio)
  verificaciones: Verificaciones[];

}
