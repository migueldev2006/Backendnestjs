import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movimientos } from '../../movimientos/entities/movimiento.entity';

@Entity('notificaciones', { schema: 'public' })
export class Notificaciones {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_notificacion' })
  idNotificacion: number;

  @Column('character varying', { name: 'titulo', nullable: true, length: 205 })
  titulo: string;

  @Column('character varying', { name: 'mensaje', nullable: true, length: 205 })
  mensaje: string | null;

  @Column('character varying', { name: 'destino', nullable: true, length: 205 })
  destino: string | null;

  @Column('boolean', { name: 'leido', nullable: true, default: () => 'false' })
  leido: boolean | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @ManyToOne(() => Movimientos, (movimientos) => movimientos.notificaciones)
  @JoinColumn([{ name: 'fk_movimiento', referencedColumnName: 'idMovimiento' }])
  fkMovimiento: Movimientos;


  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.titulo;
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
