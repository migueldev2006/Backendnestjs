import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Caracteristicas } from "../../caracteristicas/entities/caracteristica.entity";
import { Categorias } from "../../categorias/entities/categoria.entity";
import { UnidadesMedida } from "../../unidades-medida/entities/unidades-medida.entity";
import { Inventarios } from "../../inventarios/entities/inventario.entity";

@Entity("elementos", { schema: "public" })
export class Elementos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_elemento" })
  idElemento: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 70 })
  nombre: string | null;

  @Column("character varying", {
    name: "descripcion",
    nullable: true,
    length: 205,
  })
  descripcion: string | null;

  @Column("integer", { name: "valor", nullable: true })
  valor: number | null;

  @Column("boolean", { name: "perecedero", nullable: true })
  perecedero: boolean | null;

  @Column("boolean", { name: "no_perecedero", nullable: true })
  noPerecedero: boolean | null;

  @Column("boolean", { name: "estado", nullable: true })
  estado: boolean | null;

  @Column("character varying", {
    name: "imagen_elemento",
    nullable: true,
    length: 255,
  })
  imagenElemento: string | null;

  @Column("date", { name: "fecha_vencimiento", nullable: true })
  fechaVencimiento: string | null;

  @Column("date", { name: "fecha_uso", nullable: true })
  fechaUso: string | null;

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
    () => Caracteristicas,
    (caracteristicas) => caracteristicas.fkElemento
  )
  caracteristicas: Caracteristicas[];

  @ManyToOne(() => Categorias, (categorias) => categorias.elementos)
  @JoinColumn([{ name: "fk_categoria", referencedColumnName: "idCategoria" }])
  fkCategoria: Categorias;

  @ManyToOne(() => UnidadesMedida, (unidadesMedida) => unidadesMedida.elementos)
  @JoinColumn([{ name: "fk_unidad_medida", referencedColumnName: "idUnidad" }])
  fkUnidadMedida: UnidadesMedida;

  @OneToMany(() => Inventarios, (inventarios) => inventarios.fkElemento)
  inventarios: Inventarios[];
}
