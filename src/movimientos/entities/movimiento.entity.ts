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
import { Inventarios } from '../../inventarios/entities/inventario.entity';
import { Sitios } from '../../sitios/entities/sitio.entity';
import { TipoMovimientos } from '../../tipos-movimiento/entities/tipos-movimiento.entity';
import { Usuarios } from '../../usuarios/entities/usuario.entity';
import { Notificaciones } from '../../notificaciones/entities/notificacione.entity';

@Entity('movimientos', { schema: 'public' })
export class Movimientos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_movimiento' })
  idMovimiento: number;

  @Column('character varying', {
    name: 'descripcion',
    nullable: true,
    length: 205,
  })
  descripcion: string;

  @Column('integer', { name: 'cantidad', nullable: true })
  cantidad: number;

  @Column('time without time zone', { name: 'hora_ingreso', nullable: true })
  horaIngreso: string;

  @Column('time without time zone', { name: 'hora_salida', nullable: true })
  horaSalida: string;

  @Column('boolean', { name: 'aceptado', nullable: true })
  aceptado: boolean;

  @Column('boolean', { name: 'en_proceso', nullable: true })
  enProceso: boolean;

  @Column('boolean', { name: 'cancelado', nullable: true })
  cancelado: boolean;

  @Column('boolean', { name: 'devolutivo', nullable: true })
  devolutivo: boolean;

  @Column('boolean', { name: 'no_devolutivo', nullable: true })
  noDevolutivo: boolean;

    @Column('date', { name: 'fecha_devolucion', nullable:true})
    fechaDevolucion: Date;
    
    @Column('character varying', { name: 'lugar_destino', nullable:true })
    lugarDestino: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  updatedAt: Date;

  @ManyToOne(() => Inventarios, (inventarios) => inventarios.movimientos)
  @JoinColumn([{ name: 'fk_inventario', referencedColumnName: 'idInventario' }])
  fkInventario: Inventarios;

  @ManyToOne(() => Sitios, (sitios) => sitios.movimientos)
  @JoinColumn([{ name: 'fk_sitio', referencedColumnName: 'idSitio' }])
  fkSitio: Sitios;

  @ManyToOne(
    () => TipoMovimientos,
    (tipoMovimientos) => tipoMovimientos.movimientos,
  )
  @JoinColumn([{ name: 'fk_tipo_movimiento', referencedColumnName: 'idTipo' }])
  fkTipoMovimiento: TipoMovimientos;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.movimientos)
  @JoinColumn([{ name: 'fk_usuario', referencedColumnName: 'idUsuario' }])
  fkUsuario: Usuarios;
}
