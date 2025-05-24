import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Elementos } from "../entities/elemento.entity";

@Entity()
export class ElementImage {
    @PrimaryGeneratedColumn()
    id:number

    @Column('text')
    url:string

    @ManyToOne(
        () => Elementos,
        (Elemento) =>
            Elemento.images
    )
  Elemento:Elementos;
}