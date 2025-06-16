import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Caracteristicas } from '../../caracteristicas/entities/caracteristica.entity';
import { Categorias } from '../../categorias/entities/categoria.entity';
import { UnidadesMedida } from '../../unidades-medida/entities/unidades-medida.entity';
import { Inventarios } from '../../inventarios/entities/inventario.entity';
import { ElementImage } from './elemento-image.entity';

@Entity('elementos', { schema: 'public' })
export class Elementos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_elemento' })
  idElemento: number;

  @Column('character varying', { name: 'nombre', nullable: true, length: 70 })
  nombre: string;

  @Column('character varying', {
    name: 'descripcion',
    nullable: true,
    length: 205,
  })
  descripcion: string | null;

  @Column('boolean', { name: 'perecedero', nullable: true })
  perecedero: boolean | null;

  @Column('boolean', { name: 'no_perecedero', nullable: true })
  noPerecedero: boolean | null;

  @Column('boolean', { name: 'estado', nullable: true })
  estado: boolean | null;

  @Column('date', { name: 'fecha_vencimiento', nullable: true })
  fechaVencimiento: string | null;

  @Column('date', { name: 'fecha_uso', nullable: true })
  fechaUso: string | null;

  @Column({type:'boolean', name:'baja', default:false})
  baja:boolean
  
  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type:'timestamp',
    default: () => "now()",
  })
  updatedAt: Date;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @OneToMany(() => ElementImage, (ElementImage) => ElementImage.Elemento, {
    cascade: true,
  })
  images?: ElementImage[];

  @ManyToOne(() => Caracteristicas, (caracteristicas) => caracteristicas.elementos)
  @JoinColumn([{ name: 'fk_caracteristica', referencedColumnName: 'idCaracteristica' }])
  fkCaracteristica: Caracteristicas;

  @ManyToOne(() => Categorias, (categorias) => categorias.elementos)
  @JoinColumn([{ name: 'fk_categoria', referencedColumnName: 'idCategoria' }])
  fkCategoria: Categorias;

  @ManyToOne(() => UnidadesMedida, (unidadesMedida) => unidadesMedida.elementos)
  @JoinColumn([{ name: 'fk_unidad_medida', referencedColumnName: 'idUnidad' }])
  fkUnidadMedida: UnidadesMedida;

  @OneToMany(() => Inventarios, (inventarios) => inventarios.fkElemento)
  inventarios: Inventarios[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.nombre;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
