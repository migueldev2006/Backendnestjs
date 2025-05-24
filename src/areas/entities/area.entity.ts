import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sedes } from "../../sedes/entities/sede.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";
import { ProgramasFormacion } from "../../programas-formacion/entities/programas-formacion.entity";
import { Sitios } from "../../sitios/entities/sitio.entity";


@Entity("areas", { schema: "public" })
export class Areas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_area" })
  idArea: number;

  @Column("character varying", { name: "nombre", length: 70 })
  nombre: string;

  @Column("boolean", { name: "estado" })
  estado: boolean;

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

  @ManyToOne(() => Sedes, (sedes) => sedes.areas)
  @JoinColumn([{ name: "fk_sede", referencedColumnName: "idSede" }])
  fkSede: Sedes;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.areas)
  @JoinColumn([{ name: "fk_usuario", referencedColumnName: "idUsuario" }])
  fkUsuario: Usuarios;

  @OneToMany(
    () => ProgramasFormacion,
    (programasFormacion) => programasFormacion.fkArea
  )
  programasFormacions: ProgramasFormacion[];

  @OneToMany(() => Sitios, (sitios) => sitios.fkArea)
  sitios: Sitios[];
}
