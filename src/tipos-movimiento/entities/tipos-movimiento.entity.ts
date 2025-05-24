import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movimientos } from '../../movimientos/entities/movimiento.entity';

@Entity('tipo_movimientos', { schema: 'public' })
export class TipoMovimientos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_tipo' })
  idTipo: number;

  @Column('character varying', { name: 'nombre', nullable: true, length: 70 })
  nombre: string;

  @Column('boolean', { name: 'estado', nullable: true })
  estado: boolean | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkTipoMovimiento)
  movimientos: Movimientos[];

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
