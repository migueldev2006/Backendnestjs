import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'unidades_medida'})

export class UnidadMedida {
    @PrimaryGeneratedColumn()
    id_unidad:number

    @Column({type:'varchar', length:100})
    nombre:string

    @Column({type:'boolean', default:true})
    estado:boolean

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}