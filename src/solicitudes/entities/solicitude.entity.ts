import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'solicitudes'})

export class Solicitud {
    @PrimaryGeneratedColumn()
    id_solicitud:number

    @Column({type:'varchar', length:255})
    descripcion:string

    @Column({type:'int'})
    cantidad:number

    @Column({type:'boolean'})
    aceptada:boolean

    @Column({type:'boolean'})
    pendiente:boolean

    @Column({type:'boolean'})
    rechazada:boolean

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}