import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity({name:'elementos'})

export class Elemento {
    @PrimaryGeneratedColumn()
    id_elemento:number

    @Column({type:'varchar', length:100})
    nombre:string

    @Column({type:'varchar', length:255})
    descripcion:string

    @Column({type:'int', default:0})
    valor:number

    @Column({type:'boolean'})
    perecedero:boolean

    @Column({type:'boolean'})
    no_perecedero:boolean

    @Column({type:'boolean', default:true})
    estado:boolean

    @Column({type:'varchar', length:255})
    imagen_elemento:string

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date

}