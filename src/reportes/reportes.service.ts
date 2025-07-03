import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Movimientos } from 'src/movimientos/entities/movimiento.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Sitios } from 'src/sitios/entities/sitio.entity';
import { Elementos } from 'src/elementos/entities';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Inventarios)
    private readonly inventarioRepo: Repository<Inventarios>,

    @InjectRepository(Movimientos)
    private readonly movimientosRepo: Repository<Movimientos>,

    @InjectRepository(CodigoInventario)
    private readonly codigoRepo: Repository<CodigoInventario>,

    @InjectRepository(Usuarios)
    private readonly usuariosRepo: Repository<Usuarios>,

    @InjectRepository(Elementos)
    private readonly elementoRepo: Repository<Elementos>,
  ) {}

  async sitiosConMayorStock(): Promise<
    { sitio: string; total_stock: number }[]
  > {
    const resultados = await this.inventarioRepo
      .createQueryBuilder('inv')
      .leftJoin('inv.fkSitio', 'sitio')
      .select('sitio.nombre', 'sitio')
      .addSelect('SUM(inv.stock)', 'total_stock')
      .groupBy('sitio.nombre')
      .orderBy('total_stock', 'DESC')
      .limit(10)
      .getRawMany();

    return resultados.map((r) => ({
      sitio: r.sitio,
      total_stock: Number(r.total_stock),
    }));
  }

async usuarioConMasMovimientos(): Promise<any[]> {
  const resultados = await this.movimientosRepo
    .createQueryBuilder('mov')
    .leftJoin('mov.fkUsuario', 'usuario')
    .leftJoin('mov.fkSitio', 'sitio') // si quieres incluir el sitio del movimiento
    .select('usuario.nombre', 'usuario')
    .addSelect('sitio.nombre', 'sitio') // opcional
    .addSelect('COUNT(*)', 'total_movimientos')
    .groupBy('usuario.idUsuario, sitio.nombre') // asegúrate de agrupar por lo que seleccionas
    .orderBy('total_movimientos', 'DESC')
    .limit(5)
    .getRawMany();

  return resultados.map((r) => ({
    usuario: r.usuario,
    sitio: r.sitio,
    total_movimientos: Number(r.total_movimientos),
  }));
}


  async elementosPorCaducar(): Promise<any[]> {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 30);

    const resultados = await this.elementoRepo // Asegúrate de inyectarlo en el constructor
      .createQueryBuilder('elemento')
      .leftJoin('elemento.inventarios', 'inv')
      .leftJoin('inv.fkSitio', 'sitio')
      .where('elemento.fecha_vencimiento BETWEEN :hoy AND :limite', {
        hoy,
        limite,
      })
      .select([
        'elemento.nombre AS nombre',
        'elemento.fecha_vencimiento AS vencimiento',
        'sitio.nombre AS sitio',
      ])
      .orderBy('elemento.fecha_vencimiento', 'ASC')
      .getRawMany();

    return resultados.map((r) => ({
      nombre: r.nombre,
      vencimiento: r.vencimiento,
      sitio: r.sitio,
    }));
  }

  async historialDeMovimientos(
    fechaInicio: string,
    fechaFin: string,
  ): Promise<any[]> {
    const resultados = await this.movimientosRepo
      .createQueryBuilder('mov')
      .leftJoin('mov.fkUsuario', 'usuario')
      .leftJoin('mov.fkTipoMovimiento', 'tipo')
      .leftJoin('mov.fkSitio', 'sitio')
      .where('mov.createdAt BETWEEN :inicio AND :fin', {
        inicio: fechaInicio,
        fin: fechaFin,
      })
      .select([
        'tipo.nombre AS tipo',
        'usuario.nombre AS entregado_por',
        'mov.lugarDestino AS entregado_a',
        'mov.createdAt AS hora',
        'sitio.nombre AS lugar_destino',
      ])
      .orderBy('mov.createdAt', 'DESC')
      .getRawMany();

    return resultados;
  }
}
