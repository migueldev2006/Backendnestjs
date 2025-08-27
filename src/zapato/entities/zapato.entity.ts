import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('zapatos', { schema: 'public' })
export class Zapatos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_zapato' })
  idZapato: number;

  @Column('character varying', { name: 'nombre', nullable: true, length: 70 })
  nombre: string | null;

  @Column('character varying', { name: 'marca', nullable: true, length: 70 })
  marca: string | null;
  
  @Column( 'character varying', { name: "talla", nullable:true, length:70})
  talla:string
}