import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Elementos } from '../../elementos/entities/elemento.entity';

@Entity('unidades_medida', { schema: 'public' })
export class UnidadesMedida {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_unidad' })
  idUnidad: number;

  @Column('character varying', { name: 'nombre', length: 70 })
  nombre: string;

  @Column('boolean', { name: 'estado' })
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

  @OneToMany(() => Elementos, (elementos) => elementos.fkUnidadMedida)
  elementos: Elementos[];
}
