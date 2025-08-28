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

  async sitiosConMayorStock(
    sitioId?: number,
    areaId?: number,
    elementoId?: number,
  ): Promise<any[]> {
    const query = this.inventarioRepo
      .createQueryBuilder('inv')
      .leftJoinAndSelect('inv.fkSitio', 'sitio')
      .leftJoinAndSelect('sitio.fkArea', 'area')
      .leftJoinAndSelect('inv.fkElemento', 'elemento')
      .leftJoinAndSelect('inv.codigos', 'codigos');

    // ✅ Filtro por sitio
    if (sitioId) {
      query.andWhere('sitio.idSitio = :sitioId', { sitioId });
    }

    // ✅ Filtro por área
    if (areaId) {
      query.andWhere('area.idArea = :areaId', { areaId });
    }

    // ✅ Filtro por elemento específico
    if (elementoId) {
      query.andWhere('elemento.idElemento = :elementoId', { elementoId });
    }

    query.andWhere('inv.estado = true');
    const inventarios = await query.orderBy('inv.stock', 'DESC').getMany();

    return inventarios.map((inv) => {
      const codigosDisponibles = inv.codigos?.filter((c) => !c.uso) ?? [];

      return {
        Sitio: inv.fkSitio?.nombre,
        Encargado: inv.fkSitio?.personaEncargada,
        Area: inv.fkSitio?.fkArea?.nombre,
        Elemento: inv.fkElemento?.nombre,
        Cantidad: codigosDisponibles.length, // ✅ ahora solo cuenta los códigos no usados
        Caracteristicas: codigosDisponibles.map((c) => c.codigo),
      };
    });
  }

async usuarioConMasMovimientos(
  fechaInicio?: string,
  fechaFin?: string,
  usuarioId?: number,
): Promise<any[]> {
  const query = this.movimientosRepo
    .createQueryBuilder('mov')
    .leftJoin('mov.fkUsuario', 'usuario')
    .leftJoin('usuario.fkRol', 'rol')
    .leftJoin('mov.fkInventario', 'inv')
    .leftJoin('inv.fkElemento', 'elemento')
    .leftJoin('inv.fkSitio', 'sitio')
    .leftJoin('sitio.fkArea', 'area')
    .leftJoin('mov.fkTipoMovimiento', 'tipo')
    .leftJoin('mov.codigos', 'codigo')
    .select([
      'usuario.idUsuario AS id_usuario',
      'usuario.nombre AS usuario',
      'rol.nombre AS rol',
      'sitio.nombre AS sitio',
      'sitio.personaEncargada AS encargado',
      'elemento.nombre AS elemento',
      'tipo.nombre AS tipo_movimiento',
      'MAX(mov.createdAt) AS ultima_fecha',
      'COUNT(DISTINCT mov.idMovimiento) AS total_movimientos',
      'COUNT(DISTINCT codigo.idCodigoInventario) AS total_codigos',
      `ARRAY_AGG(DISTINCT codigo.codigo) FILTER (WHERE codigo.codigo IS NOT NULL) AS codigos_array`, // ✅
      'MAX(inv.stock) AS stock',
    ]);

  if (fechaInicio && fechaFin) {
    query.andWhere('mov.createdAt BETWEEN :inicio AND :fin', {
      inicio: fechaInicio,
      fin: fechaFin,
    });
  }

  if (usuarioId) {
    query.andWhere('usuario.idUsuario = :usuarioId', { usuarioId });
  }

  const resultados = await query
    .groupBy(
      'usuario.idUsuario, usuario.nombre, rol.nombre, sitio.nombre, sitio.personaEncargada, elemento.nombre, tipo.nombre',
    )
    .orderBy('total_movimientos', 'DESC')
    .limit(5)
    .getRawMany();

  return resultados.map((r) => {
    const codigos = Array.isArray(r.codigos_array)
      ? r.codigos_array.filter((c) => c !== null)
      : [];

    return {
      id_usuario: Number(r.id_usuario),
      usuario: r.usuario,
      rol: r.rol,
      sitio: r.sitio,
      encargado: r.encargado,
      elemento: r.elemento,
      tipo_movimiento: r.tipo_movimiento,
      ultima_fecha: r.ultima_fecha,
      total_movimientos: Number(r.total_movimientos),
      cantidad: codigos.length > 0 ? null : Number(r.stock || 0),
      codigos,
    };
  });
}



  async elementosPorCaducar(sitioId?: number, areaId?: number): Promise<any[]> {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 30);

    const query = this.elementoRepo
      .createQueryBuilder('elemento')
      .leftJoin('elemento.inventarios', 'inv')
      .leftJoin('inv.movimientos', 'mov')
      .leftJoin('mov.fkTipoMovimiento', 'tipo')
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
        'sitio.personaEncargada AS registrado_por',
        'sitio.nombre AS sitio',
        'sitio.nombre AS sitio',
        'area.nombre AS area',
        '(elemento.fechaVencimiento - CURRENT_DATE) AS dias_restantes',
      ]);

    if (sitioId) {
      query.andWhere('sitio.idSitio = :sitioId', { sitioId });
    }

    if (areaId) {
      query.andWhere('area.idArea = :areaId', { areaId });
    }

    const resultados = await query
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
    fechaInicio?: string,
    fechaFin?: string,
    usuarioId?: number,
    tipoMovimientoId?: number,
    sitioId?: number,
  ): Promise<any[]> {
    const query = this.movimientosRepo
      .createQueryBuilder('mov')
      .leftJoin('mov.fkUsuario', 'usuario')
      .leftJoin('usuario.fkRol', 'rol')
      .leftJoin('mov.fkTipoMovimiento', 'tipo')
      .leftJoin('mov.fkInventario', 'inv')
      .leftJoin('inv.fkElemento', 'elemento')
      .leftJoin('inv.fkSitio', 'sitio')
      .leftJoin('mov.codigos', 'codigo') // ✅ Códigos asociados AL MOVIMIENTO
      .leftJoin('sitio.fkArea', 'area')
      .select([
        'mov.idMovimiento AS id',
        'tipo.nombre AS tipo',
        'elemento.nombre AS elemento',
        'usuario.nombre AS usuario',
        'rol.nombre AS rol',
        'sitio.nombre AS sitio',
        'area.nombre AS area',
        'mov.lugarDestino AS lugar_destino',
        'mov.createdAt AS fecha',
        'COUNT(DISTINCT codigo.idCodigoInventario) AS cantidad',
        "STRING_AGG(DISTINCT codigo.codigo, ', ') AS codigos",
      ]);

    // ✅ Filtro por rango de fechas (opcional)
    if (fechaInicio && fechaFin) {
      query.andWhere('mov.createdAt BETWEEN :inicio AND :fin', {
        inicio: fechaInicio,
        fin: fechaFin,
      });
    }

    // ✅ Filtro por usuario (opcional)
    if (usuarioId) {
      query.andWhere('usuario.idUsuario = :usuarioId', { usuarioId });
    }

    // ✅ Filtro por tipo de movimiento (opcional)
    if (tipoMovimientoId) {
      query.andWhere('tipo.idTipoMovimiento = :tipoMovimientoId', {
        tipoMovimientoId,
      });
    }

    // ✅ Filtro por sitio (opcional)
    if (sitioId) {
      query.andWhere('sitio.idSitio = :sitioId', { sitioId });
    }

    const resultados = await query
      .groupBy(
        'mov.idMovimiento, tipo.nombre, elemento.nombre, usuario.nombre, rol.nombre, sitio.nombre, area.nombre, mov.lugarDestino, mov.createdAt',
      )
      .orderBy('mov.createdAt', 'DESC')
      .getRawMany();

    return resultados.map((r) => ({
      id: r.id,
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
