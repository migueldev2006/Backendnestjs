import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'areas'})

export class Area {
  @PrimaryGeneratedColumn('increment')
  id_area: number;

  @Column({ type: 'varchar', length: 20 })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column('text', { unique: true })
  slug: string;

}
