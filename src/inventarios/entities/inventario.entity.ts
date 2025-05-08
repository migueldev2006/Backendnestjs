import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'inventarios'})

export class Inventario {
    @PrimaryGeneratedColumn()
    id_inventario:number

    @Column({type:'int', default:0})
    stock:number

    @Column({type:'boolean', default:true})
    estado:boolean

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}