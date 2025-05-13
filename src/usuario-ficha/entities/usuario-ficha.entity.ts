import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fichas } from "../../fichas/entities/ficha.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("usuario_ficha", { schema: "public" })
export class UsuarioFicha {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario_ficha" })
  idUsuarioFicha: number;

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

  @ManyToOne(() => Fichas, (fichas) => fichas.usuarioFichas)
  @JoinColumn([{ name: "fk_ficha", referencedColumnName: "idFicha" }])
  fkFicha: Fichas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuarioFichas)
  @JoinColumn([{ name: "fk_usuario", referencedColumnName: "idUsuario" }])
  fkUsuario: Usuarios;
}
