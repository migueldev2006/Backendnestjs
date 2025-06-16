import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Elementos } from '../../elementos/entities/elemento.entity';
import { Sitios } from '../../sitios/entities/sitio.entity';
import { Movimientos } from '../../movimientos/entities/movimiento.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';

@Entity('inventarios', { schema: 'public' })
export class Inventarios {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_inventario' })
  idInventario: number;

  @Column('integer', { name: 'stock', default:0 })
  stock: number;

  @Column('boolean', { name: 'estado', default:true })
  estado: boolean;

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

  @ManyToOne(() => Elementos, (elementos) => elementos.inventarios)
  @JoinColumn([{ name: 'fk_elemento', referencedColumnName: 'idElemento' }])
  fkElemento: Elementos;

  @ManyToOne(() => Sitios, (sitios) => sitios.inventarios)
  @JoinColumn([{ name: 'fk_sitio', referencedColumnName: 'idSitio' }])
  fkSitio: Sitios;

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkInventario)
  movimientos: Movimientos[];

  @OneToMany(() => CodigoInventario, (codigos) => codigos.fkInventario)
  codigos: CodigoInventario[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.slug;
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
