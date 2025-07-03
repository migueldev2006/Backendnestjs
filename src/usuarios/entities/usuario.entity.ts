import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Areas } from '../../areas/entities/area.entity';
import { Movimientos } from '../../movimientos/entities/movimiento.entity';
import { UsuarioFicha } from '../../usuario-ficha/entities/usuario-ficha.entity';
import { Roles } from '../../roles/entities/role.entity';
import { Notificaciones } from 'src/notificaciones/entities/notificacione.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';

@Entity('usuarios', { schema: 'public' })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column('integer', { name: 'documento', nullable: true, unique: true })
  documento: number;

  @Column('character varying', { name: 'nombre', nullable: true, length: 70 })
  nombre: string;

  @Column('character varying', { name: 'apellido', nullable: true, length: 70 })
  apellido: string;

  @Column('integer', { name: 'edad', nullable: true })
  edad: number;

  @Column('character varying', { name: 'telefono', nullable: true, length: 15 })
  telefono: string;

  @Column('character varying', { name: 'correo', nullable: true, length: 70 })
  correo: string;

  @Column('boolean', { name: 'estado', nullable: true })
  estado: boolean;

  @Column('character varying', { name: 'cargo', nullable: true, length: 70 })
  cargo: string;

  @Column('character varying', { name: 'password', nullable: true, length: 60 })
  password: string;

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

  @Column('character varying', { name: 'perfil', nullable: true, length: 255 })
  perfil: string;

  @OneToMany(() => Areas, (areas) => areas.fkUsuario)
  areas: Areas[];

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkUsuario)
  movimientos: Movimientos[];

  @OneToMany(() => UsuarioFicha, (usuarioFicha) => usuarioFicha.fkUsuario)
  usuarioFichas: UsuarioFicha[];

  @ManyToOne(() => Roles, (roles) => roles.usuarios)
  @JoinColumn([{ name: 'fk_rol', referencedColumnName: 'idRol' }])
  fkRol: Roles;

  @OneToMany(() => Notificaciones, (notificaciones) => notificaciones.fkUsuario)
  notificaciones: Notificaciones[];

  @Column('integer', { name: 'fk_sitio', nullable: true })
  fkSitio: number;

  // // Relación con Sitio
  // @ManyToOne(() => Sitios, (sitio) => sitio.usuarios)
  // @JoinColumn({ name: 'fk_sitio' })
  // sitio: Sitios;

  // // Relación con Área
  // @ManyToOne(() => Areas)
  // @JoinColumn({ name: 'fk_area' })
  // area: Areas;

  
}
