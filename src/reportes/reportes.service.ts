import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Inventarios } from 'src/inventarios/entities/inventario.entity';
import { Movimientos } from 'src/movimientos/entities/movimiento.entity';
import { CodigoInventario } from 'src/codigo-inventario/entities/codigo-inventario.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Elementos } from 'src/elementos/entities/elemento.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Inventarios)
    private readonly inventarioRepo: Repository<Inventarios>,

    @InjectRepository(Movimientos)
    private readonly movimientosRepo: Repository<Movimientos>,

    @InjectRepository(Usuarios)
    private readonly usuariosRepo: Repository<Usuarios>,

    @InjectRepository(Elementos)
    private readonly elementoRepo: Repository<Elementos>,
  ) {}

  async sitiosConMayorStock(): Promise<any[]> {
    const inventarios = await this.inventarioRepo
      .createQueryBuilder('inv')
      .leftJoinAndSelect('inv.fkSitio', 'sitio')
      .leftJoinAndSelect('sitio.fkArea', 'area')
      .leftJoinAndSelect('inv.fkElemento', 'elemento')
      .leftJoinAndSelect('inv.codigos', 'codigos')
      .orderBy('inv.stock', 'DESC')
      .getMany();

    return inventarios.map((inv) => ({
      sitio: inv.fkSitio?.nombre,
      encargado: inv.fkSitio?.personaEncargada,
      area: inv.fkSitio?.fkArea?.nombre,
      elemento: inv.fkElemento?.nombre,
      cantidad: inv.stock,
      caracteristicas:
        inv.codigos?.map((c) => ({
          codigo: c.codigo,
          fecha_creacion: c.createdAt,
        })) ?? [],
    }));
  }

  async usuarioConMasMovimientos(): Promise<any[]> {
    const resultados = await this.movimientosRepo
      .createQueryBuilder('mov')
      .leftJoin('mov.fkUsuario', 'usuario')
      .leftJoin('usuario.fkRol', 'rol')
      .leftJoin('mov.fkInventario', 'inv')
      .leftJoin('inv.fkElemento', 'elemento')
      .leftJoin('inv.fkSitio', 'sitio')
      .leftJoin('sitio.fkArea', 'area')
      .leftJoin('inv.codigos', 'codigo') // Características/códigos
      .select([
        'usuario.nombre AS usuario',
        'rol.nombre AS rol',
        'sitio.nombre AS sitio',
        'sitio.personaEncargada AS encargado',
        'elemento.nombre AS elemento',
        'inv.stock AS stock',
        'COUNT(DISTINCT mov.idMovimiento) AS total_movimientos',
        "STRING_AGG(codigo.codigo, ', ') AS codigos",
      ])
      .groupBy(
        'usuario.idUsuario, rol.nombre, sitio.nombre, sitio.personaEncargada, elemento.nombre, inv.stock',
      )
      .orderBy('total_movimientos', 'DESC')
      .limit(5)
      .getRawMany();

    return resultados.map((r) => ({
      usuario: r.usuario,
      rol: r.rol,
      sitio: r.sitio,
      encargado: r.encargado,
      elemento: r.elemento,
      total_movimientos: Number(r.total_movimientos),
      cantidad: r.codigos ? undefined : Number(r.stock),
      codigos: r.codigos ? r.codigos.split(', ') : [],
    }));
  }

  async elementosPorCaducar(): Promise<any[]> {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 30);

    const resultados = await this.elementoRepo
      .createQueryBuilder('elemento')
      .leftJoin('elemento.inventarios', 'inv')
      .leftJoin('inv.movimientos', 'mov')
      .leftJoin('mov.fkTipoMovimiento', 'tipo')
      .leftJoin('mov.fkUsuario', 'usuario')
      .leftJoin('inv.fkSitio', 'sitio')
      .leftJoin('sitio.fkArea', 'area')
      .where('elemento.fechaVencimiento BETWEEN :hoy AND :limite', {
        hoy,
        limite,
      })
      .select([
        'elemento.nombre AS nombre',
        'elemento.fechaVencimiento AS vencimiento',
        'elemento.createdAt AS creado',
        'usuario.nombre AS registrado_por',
        'sitio.nombre AS sitio',
        'area.nombre AS area',
        '(elemento.fechaVencimiento - CURRENT_DATE) AS dias_restantes',
      ])
      .orderBy('elemento.fechaVencimiento', 'ASC')
      .getRawMany();

    return resultados.map((r) => ({
      nombre: r.nombre,
      vencimiento: r.vencimiento,
      creado: r.creado,
      registrado_por: r.registrado_por ?? 'No registrado',
      sitio: r.sitio,
      area: r.area,
      dias_restantes: Number(r.dias_restantes),
    }));
  }

  async historialDeMovimientos(
    fechaInicio: string,
    fechaFin: string,
  ): Promise<any[]> {
    const resultados = await this.movimientosRepo
      .createQueryBuilder('mov')
      .leftJoin('mov.fkUsuario', 'usuario')
      .leftJoin('usuario.fkRol', 'rol')
      .leftJoin('mov.fkTipoMovimiento', 'tipo')
      .leftJoin('mov.fkInventario', 'inv')
      .leftJoin('inv.fkElemento', 'elemento')
      .leftJoin('inv.fkSitio', 'sitio')
      .leftJoin('inv.codigos', 'codigo')
      .leftJoin('sitio.fkArea', 'area')
      .where('mov.createdAt BETWEEN :inicio AND :fin', {
        inicio: fechaInicio,
        fin: fechaFin,
      })
      .select([
        'tipo.nombre AS tipo',
        'elemento.nombre AS elemento',
        'usuario.nombre AS usuario',
        'rol.nombre AS rol',
        'sitio.nombre AS sitio',
        'area.nombre AS area',
        'mov.lugarDestino AS lugar_destino',
        'mov.createdAt AS fecha',
        'COUNT(codigo.idCodigoInventario) AS cantidad',
        "STRING_AGG(codigo.codigo, ', ') AS codigos",
      ])
      .groupBy(
        'tipo.nombre, elemento.nombre, usuario.nombre, rol.nombre, sitio.nombre, area.nombre, mov.lugarDestino, mov.createdAt',
      )
      .orderBy('mov.createdAt', 'DESC')
      .getRawMany();

    return resultados.map((r) => ({
      tipo: r.tipo,
      elemento: r.elemento,
      usuario: r.usuario,
      rol: r.rol,
      sitio: r.sitio,
      area: r.area,
      lugar_destino: r.lugar_destino,
      fecha: r.fecha,
      cantidad: Number(r.cantidad),
      codigos: r.codigos ? r.codigos.split(', ') : [],
    }));
  }
}
