import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProgramasFormacion } from "../../programas-formacion/entities/programas-formacion.entity";
import { UsuarioFicha } from "../../usuario-ficha/entities/usuario-ficha.entity";

@Entity("fichas", { schema: "public" })
export class Fichas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_ficha" })
  idFicha: number;

  @Column("integer", { name: "codigo_ficha" })
  codigoFicha: number;

  @Column("boolean", { name: "estado", default: true })
  estado: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn( {
    name: "updated_at",
    type:"timestamp",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(
    () => ProgramasFormacion,
    (programasFormacion) => programasFormacion.fichas
  )
  @JoinColumn([{ name: "fk_programa", referencedColumnName: "idPrograma" }])
  fkPrograma: ProgramasFormacion;

  @OneToMany(() => UsuarioFicha, (usuarioFicha) => usuarioFicha.fkFicha)
  usuarioFichas: UsuarioFicha[];
}
