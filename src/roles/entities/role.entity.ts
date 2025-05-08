import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'roles'})

export class Rol {
    @PrimaryGeneratedColumn()
    id_rol:number

    @Column({type:'varchar', length:100})
    nombre:string

    @Column({type:'boolean', default:true})
    estado:boolean

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}