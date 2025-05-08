import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'verificaciones'})

export class Verificacion {
    @PrimaryGeneratedColumn()
    id_verificacion:number

    @Column({type:'varchar', length:100})
    persona_encargadad:string

    @Column({type:'varchar', default:true})
    persona_asignada:string

    @Column({type:'time', nullable:false})
    hora_ingreso:string

    @Column({type:'time', nullable:false})
    hora_fin:string

    @Column({type:'varchar', length:255})
    observaciones:string

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}