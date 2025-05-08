import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'movimientos'})

export class Movimiento {
    @PrimaryGeneratedColumn()
    id_movimiento:number

    @Column({type:'varchar', length:100})
    descripcion:string

    @Column({type:'int', default:0})
    cantidad:number

    @Column({type:'time', nullable:false})
    hora_ingreso:string

    @Column({type:'time', nullable:false})
    hora_salida:string

    @Column({type:'boolean'})
    aceptado:boolean

    @Column({type:'boolean'})
    en_proceso:boolean

    @Column({type:'boolean'})
    cancelado:boolean

    @Column({type:'boolean'})
    devolutivo:boolean

    @Column({type:'boolean'})
    no_devolutivo:boolean

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}