import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulos } from 'src/modulos/entities/modulo.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity'
import { Rutas } from 'src/rutas/entities/ruta.entity'
import { Permisos } from 'src/permisos/entities/permiso.entity';
import { RolPermiso } from 'src/rol-permiso/entities/rol-permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedsService {
    constructor(
        @InjectRepository(Modulos)
        private readonly modulosRepository: Repository<Modulos>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>,
        @InjectRepository(Rutas)
        private readonly rutasRepository: Repository<Rutas>,
        @InjectRepository(Permisos)
        private readonly permisosRepository: Repository<Permisos>,
        @InjectRepository(RolPermiso)
        private readonly rolPermisoRepository: Repository<RolPermiso>
    ) { }

    async seed() {

        const roles = [
            {
                idRol: 1,
                nombre: "Administrador",
                estado: true
            }
        ]

        const users = [
            {
                idUsuario: 1,
                documento: 1111111111,
                nombre: "Admin",
                estado: true,
                password: "hola1234",
                fkRol: { idRol: 1 }
            },
        ]


        const modules = [
            {
                idModulo: 1,
                nombre: "Admin",
                icono: "UserIcon",
                estado: true
            },

            {
                idModulo: 2,
                nombre: "Bodega",
                icono: "ArchiveBoxIcon",
                estado: true
            },
            {
                idModulo: 3,
                nombre: "Reportes",
                icono: "DocumentChartBarIcon",
                estado: true
            }
        ];



        const rutas = [
            {
                idRuta: 1,
                nombre: "Usuarios",
                href: "admin/usuarios",
                fkModulo: { idModulo: 1 },
                icono: "UserIcon",
                listed: true,
                estado: true
            },
            {
                idRuta: 2,
                nombre: "Fichas",
                href: "admin/fichas",
                fkModulo: { idModulo: 1 },
                icono: "TagIcon",
                listed: true,
                estado: true
            },
            {
                idRuta: 3,
                nombre: "Areas",
                href: "admin/areas",
                fkModulo: { idModulo: 1 },
                icono: "GlobalAmericasIcon",
                listed: true,
                estado: true
            },
            {
                idRuta: 4,
                nombre: "Sitios",
                href: "admin/sitios",
                fkModulo: { idModulo: 1 },
                icono: "BuildingOfficeIcon",
                listed: true,
                estado: true
            },
            {
                idRuta: 6,
                nombre: "Elementos",
                href: "bodega/elementos",
                icono: "CubeIcon",
                listed: true,
                estado: true,
                fkModulo: { idModulo: 2 }
            },
            {
                idRuta: 7,
                nombre: "Movimientos",
                href: "bodega/movimientos",
                icono: "ArrowsRightLeftIcon",
                listed: true,
                estado: true,
                fkModulo: { idModulo: 2 }
            },
            {
                idRuta: 8,
                nombre: "Inventarios",
                href: "bodega/inventario/areas",
                icono: "ClipboardDocumentListIcon",
                listed: true,
                estado: true,
                fkModulo: { idModulo: 2 }
            },
            {
                idRuta: 9,
                nombre: "Reportes",
                href: "reportes",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 3 }
            },
            {
                idRuta: 10,
                nombre: "Roles",
                href: "admin/roles",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 1 }
            },
            {
                idRuta: 11,
                nombre: "Programas formacion",
                href: "admin/programas",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 1 }
            },
            {
                idRuta: 12,
                nombre: "Sedes",
                href: "admin/sedes",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 1 }
            },
            {
                idRuta: 13,
                nombre: "Centros",
                href: "admin/centros",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 1 }
            },
            {
                idRuta: 14,
                nombre: "Municipios",
                href: "admin/municipios",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 1 }
            },
            {
                idRuta: 15,
                nombre: "Tipos Sitios",
                href: "admin/tiposSitio",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 1 }
            },
            {
                idRuta: 16,
                nombre: "Unidades medida",
                href: "bodega/unidades",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 2 }
            },
            {
                idRuta: 17,
                nombre: "Categorias",
                href: "bodega/categorias",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 2 }
            },
            {
                idRuta: 18,
                nombre: "Caracteristicas",
                href: "bodega/caracteristicas",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 2 }
            },
            {
                idRuta: 19,
                nombre: "Tipos movimientos",
                href: "bodega/tipos",
                listed: false,
                estado: true,
                fkModulo: { idModulo: 2 }
            }

        ]


        const permisos =
            [
                {
                    idPermiso: 1,
                    permiso: "Crear Usuario",
                    fkRuta: {
                        idRuta: 1
                    }
                },
                {
                    idPermiso: 2,
                    permiso: "Registro Masivo",
                    fkRuta: {
                        idRuta: 1
                    }
                },
                {
                    idPermiso: 3,
                    permiso: "Listar Usuarios",
                    fkRuta: {
                        idRuta: 1
                    }
                },
                {
                    idPermiso: 4,
                    permiso: "Actualizar Usuario",
                    fkRuta: {
                        idRuta: 1
                    }
                },
                {
                    idPermiso: 5,
                    permiso: "Cambiar Estado del Usuario",
                    fkRuta: {
                        idRuta: 1
                    }
                },
                {
                    idPermiso: 6,
                    permiso: "Crear Ficha",
                    fkRuta: {
                        idRuta: 2
                    }
                },
                {
                    idPermiso: 7,
                    permiso: "Listar Fichas",
                    fkRuta: {
                        idRuta: 2
                    }
                },
                {
                    idPermiso: 8,
                    permiso: "Actualizar Ficha",
                    fkRuta: {
                        idRuta: 2
                    }
                },
                {
                    idPermiso: 9,
                    permiso: "Cambiar Estado de la Ficha",
                    fkRuta: {
                        idRuta: 2
                    }
                },
                {
                    idPermiso: 10,
                    permiso: "Crear Area",
                    fkRuta: {
                        idRuta: 3
                    }
                },
                {
                    idPermiso: 11,
                    permiso: "Listar Areas",
                    fkRuta: {
                        idRuta: 3
                    }
                },
                {
                    idPermiso: 12,
                    permiso: "Actualizar Area",
                    fkRuta: {
                        idRuta: 3
                    }
                },
                {
                    idPermiso: 13,
                    permiso: "Cambiar Estado del Area",
                    fkRuta: {
                        idRuta: 3
                    }
                },
                {
                    idPermiso: 14,
                    permiso: "Crear Sitio",
                    fkRuta: {
                        idRuta: 4
                    }
                },
                {
                    idPermiso: 15,
                    permiso: "Listar Sitios",
                    fkRuta: {
                        idRuta: 4
                    }
                },
                {
                    idPermiso: 16,
                    permiso: "Actualizar Sitio",
                    fkRuta: {
                        idRuta: 4
                    }
                },
                {
                    idPermiso: 17,
                    permiso: "Cambiar Estado del Sitio",
                    fkRuta: {
                        idRuta: 4
                    }
                },
                {
                    idPermiso: 18,
                    permiso: "Crear Elemento",
                    fkRuta: {
                        idRuta: 6
                    }
                },
                {
                    idPermiso: 19,
                    permiso: "Listar Elemento",
                    fkRuta: {
                        idRuta: 6
                    }
                },
                {
                    idPermiso: 20,
                    permiso: "Actualizar Elemento",
                    fkRuta: {
                        idRuta: 6
                    }
                },
                {
                    idPermiso: 21,
                    permiso: "Cambiar estado Elemento",
                    fkRuta: {
                        idRuta: 6
                    }
                },
                {
                    idPermiso: 22,
                    permiso: "Crear Movimiento",
                    fkRuta: {
                        idRuta: 7
                    }
                },
                {
                    idPermiso: 23,
                    permiso: "Listar Movimientos",
                    fkRuta: {
                        idRuta: 7
                    }
                },
                {
                    idPermiso: 24,
                    permiso: "Actualizar Movimiento",
                    fkRuta: {
                        idRuta: 7
                    }
                },
                {
                    idPermiso: 25,
                    permiso: "Aceptar Movimiento",
                    fkRuta: {
                        idRuta: 7
                    }
                },
                {
                    idPermiso: 26,
                    permiso: "Cancelar Movimiento",
                    fkRuta: {
                        idRuta: 7
                    }
                },
                {
                    idPermiso: 27,
                    permiso: "Crear Inventario",
                    fkRuta: {
                        idRuta: 8
                    }
                },
                {
                    idPermiso: 28,
                    permiso: "Agregar Stock Inventario",
                    fkRuta: {
                        idRuta: 8
                    }
                },
                {
                    idPermiso: 29,
                    permiso: "Listar Inventario",
                    fkRuta: {
                        idRuta: 8
                    }
                },
                {
                    idPermiso: 30,
                    permiso: "Actualizar Inventario",
                    fkRuta: {
                        idRuta: 8
                    }
                },
                {
                    idPermiso: 31,
                    permiso: "Cambiar Estado del Inventario",
                    fkRuta: {
                        idRuta: 8
                    }
                },
                {
                    idPermiso: 32,
                    permiso: "Ver reportes",
                    fkRuta: {
                        idRuta: 9
                    }
                },
                {
                    idPermiso: 33,
                    permiso: "Crear Rol",
                    fkRuta: { idRuta: 10 }
                },
                {
                    idPermiso: 34,
                    permiso: "Listar Roles",
                    fkRuta: { idRuta: 10 }
                },
                {
                    idPermiso: 35,
                    permiso: "Actualizar Rol",
                    fkRuta: { idRuta: 10 }
                },
                {
                    idPermiso: 36,
                    permiso: "Cambiar Estado del Rol",
                    fkRuta: { idRuta: 10 }
                },
                {
                    idPermiso: 37,
                    permiso: "Actualizar Permiso",
                    fkRuta: { idRuta: 10 }
                },
                {
                    idPermiso: 38,
                    permiso: "Asignar Permiso",
                    fkRuta: { idRuta: 10 }
                },
                {
                    idPermiso: 39,
                    permiso: "Crear Programa",
                    fkRuta: { idRuta: 11 }
                },
                {
                    idPermiso: 40,
                    permiso: "Listar Programas",
                    fkRuta: { idRuta: 11 }
                },
                {
                    idPermiso: 41,
                    permiso: "Actualizar Programas",
                    fkRuta: { idRuta: 11 }
                },
                {
                    idPermiso: 42,
                    permiso: "Cambiar Estado del Programa",
                    fkRuta: { idRuta: 11 }
                },
                {
                    idPermiso: 43,
                    permiso: "Crear Sedes",
                    fkRuta: { idRuta: 12 }
                },
                {
                    idPermiso: 44,
                    permiso: "Listar Sedes",
                    fkRuta: { idRuta: 12 }
                },
                {
                    idPermiso: 45,
                    permiso: "Actualizar Sedes",
                    fkRuta: { idRuta: 12 }
                },
                {
                    idPermiso: 46,
                    permiso: "Cambiar Estado de la Sede",
                    fkRuta: { idRuta: 12 }
                },
                {
                    idPermiso: 47,
                    permiso: "Crear Centro",
                    fkRuta: { idRuta: 13 }
                },
                {
                    idPermiso: 48,
                    permiso: "Listar Centros",
                    fkRuta: { idRuta: 13 }
                },
                {
                    idPermiso: 49,
                    permiso: "Actualizar Centro",
                    fkRuta: { idRuta: 13 }
                },
                {
                    idPermiso: 50,
                    permiso: "Cambiar Estado del Centro",
                    fkRuta: { idRuta: 13 }
                },
                {
                    idPermiso: 51,
                    permiso: "Crear municipio",
                    fkRuta: { idRuta: 14 }
                },
                {
                    idPermiso: 52,
                    permiso: "Listar municipios",
                    fkRuta: { idRuta: 14 }
                },
                {
                    idPermiso: 53,
                    permiso: "Actualizar municipio",
                    fkRuta: { idRuta: 14 }
                },
                {
                    idPermiso: 54,
                    permiso: "Cambiar Estado del municipio",
                    fkRuta: { idRuta: 14 }
                },
                {
                    idPermiso: 55,
                    permiso: "Crear tipo sitio",
                    fkRuta: { idRuta: 15 }
                },
                {
                    idPermiso: 56,
                    permiso: "Listar tipo de sitios",
                    fkRuta: { idRuta: 15 }
                },
                {
                    idPermiso: 57,
                    permiso: "Actualizar tipo de sitio",
                    fkRuta: { idRuta: 15 }
                },
                {
                    idPermiso: 58,
                    permiso: "Cambiar Estado del tipo de sitio",
                    fkRuta: { idRuta: 15 }
                },
                {
                    idPermiso: 59,
                    permiso: "Crear unidad medida",
                    fkRuta: { idRuta: 16 }
                },
                {
                    idPermiso: 60,
                    permiso: "Listar unidad medida",
                    fkRuta: { idRuta: 16 }
                },
                {
                    idPermiso: 61,
                    permiso: "Actualizar unidad medida",
                    fkRuta: { idRuta: 16 }
                },
                {
                    idPermiso: 62,
                    permiso: "Cambiar Estado de la unidad medida",
                    fkRuta: { idRuta: 16 }
                },
                {
                    idPermiso: 63,
                    permiso: "Crear categoria",
                    fkRuta: { idRuta: 17 }
                },
                {
                    idPermiso: 64,
                    permiso: "Listar categoria",
                    fkRuta: { idRuta: 17 }
                },
                {
                    idPermiso: 65,
                    permiso: "Actualizar categoria",
                    fkRuta: { idRuta: 17 }
                },
                {
                    idPermiso: 66,
                    permiso: "Cambiar Estado de la categoria",
                    fkRuta: { idRuta: 17 }
                },
                {
                    idPermiso: 67,
                    permiso: "Crear caracteristica",
                    fkRuta: { idRuta: 18 }
                },
                {
                    idPermiso: 68,
                    permiso: "Listar caracteristicas",
                    fkRuta: { idRuta: 18 }
                },
                {
                    idPermiso: 69,
                    permiso: "Actualizar caracteristica",
                    fkRuta: { idRuta: 18 }
                },
                {
                    idPermiso: 70,
                    permiso: "Cambiar Estado de la caracteristica",
                    fkRuta: { idRuta: 18 }
                },
                {
                    idPermiso: 71,
                    permiso: "Crear tipo de movimiento",
                    fkRuta: { idRuta: 19 }
                },
                {
                    idPermiso: 72,
                    permiso: "Listar tipos de movimientos",
                    fkRuta: { idRuta: 19 }
                },
                {
                    idPermiso: 73,
                    permiso: "Actualizar tipo de movimiento",
                    fkRuta: { idRuta: 19 }
                },
                {
                    idPermiso: 74,
                    permiso: "Cambiar Estado del tipo de movimiento",
                    fkRuta: { idRuta: 19 }
                }
            ]

        const rol_permiso = [
            {
                idRolPermiso: 1,
                estado: true,
                fkPermiso: { idPermiso: 1},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 2,
                estado: true,
                fkPermiso: { idPermiso: 2},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 3,
                estado: true,
                fkPermiso: { idPermiso: 3},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 4,
                estado: true,
                fkPermiso: { idPermiso: 4},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 5,
                estado: true,
                fkPermiso: { idPermiso: 5},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 6,
                estado: true,
                fkPermiso: { idPermiso: 6},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 7,
                estado: true,
                fkPermiso: { idPermiso: 7},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 8,
                estado: true,
                fkPermiso: { idPermiso: 8},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 9,
                estado: true,
                fkPermiso: { idPermiso: 9},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 10,
                estado: true,
                fkPermiso: { idPermiso: 10},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 11,
                estado: true,
                fkPermiso: { idPermiso: 11},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 12,
                estado: true,
                fkPermiso: { idPermiso: 12},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 13,
                estado: true,
                fkPermiso: { idPermiso: 13},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 14,
                estado: true,
                fkPermiso: { idPermiso: 14},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 15,
                estado: true,
                fkPermiso: { idPermiso: 15},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 16,
                estado: true,
                fkPermiso: { idPermiso: 16},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 17,
                estado: true,
                fkPermiso: { idPermiso: 17},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 18,
                estado: true,
                fkPermiso: { idPermiso: 18},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 19,
                estado: true,
                fkPermiso: { idPermiso: 19},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 20,
                estado: true,
                fkPermiso: { idPermiso: 20},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 21,
                estado: true,
                fkPermiso: { idPermiso: 21},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 22,
                estado: true,
                fkPermiso: { idPermiso: 22},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 23,
                estado: true,
                fkPermiso: { idPermiso: 23},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 24,
                estado: true,
                fkPermiso: { idPermiso: 24},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 25,
                estado: true,
                fkPermiso: { idPermiso: 25},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 26,
                estado: true,
                fkPermiso: { idPermiso: 26},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 27,
                estado: true,
                fkPermiso: { idPermiso: 27},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 28,
                estado: true,
                fkPermiso: { idPermiso: 28},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 29,
                estado: true,
                fkPermiso: { idPermiso: 29},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 30,
                estado: true,
                fkPermiso: { idPermiso: 30},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 31,
                estado: true,
                fkPermiso: { idPermiso: 31},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 32,
                estado: true,
                fkPermiso: { idPermiso: 32},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 33,
                estado: true,
                fkPermiso: { idPermiso: 33},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 34,
                estado: true,
                fkPermiso: { idPermiso: 34},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 35,
                estado: true,
                fkPermiso: { idPermiso: 35},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 36,
                estado: true,
                fkPermiso: { idPermiso: 36},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 37,
                estado: true,
                fkPermiso: { idPermiso: 37},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 38,
                estado: true,
                fkPermiso: { idPermiso: 38},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 39,
                estado: true,
                fkPermiso: { idPermiso: 39},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 40,
                estado: true,
                fkPermiso: { idPermiso: 40},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 41,
                estado: true,
                fkPermiso: { idPermiso: 41},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 42,
                estado: true,
                fkPermiso: { idPermiso: 42},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 43,
                estado: true,
                fkPermiso: { idPermiso: 43},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 44,
                estado: true,
                fkPermiso: { idPermiso: 44},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 45,
                estado: true,
                fkPermiso: { idPermiso: 45},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 46,
                estado: true,
                fkPermiso: { idPermiso: 46},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 47,
                estado: true,
                fkPermiso: { idPermiso: 47},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 48,
                estado: true,
                fkPermiso: { idPermiso: 48},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 49,
                estado: true,
                fkPermiso: { idPermiso: 49},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 50,
                estado: true,
                fkPermiso: { idPermiso: 50},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 51,
                estado: true,
                fkPermiso: { idPermiso: 51},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 52,
                estado: true,
                fkPermiso: { idPermiso: 52},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 53,
                estado: true,
                fkPermiso: { idPermiso: 53},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 54,
                estado: true,
                fkPermiso: { idPermiso: 54},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 55,
                estado: true,
                fkPermiso: { idPermiso: 55},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 56,
                estado: true,
                fkPermiso: { idPermiso: 56},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 57,
                estado: true,
                fkPermiso: { idPermiso: 57},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 58,
                estado: true,
                fkPermiso: { idPermiso: 58},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 59,
                estado: true,
                fkPermiso: { idPermiso: 59},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 60,
                estado: true,
                fkPermiso: { idPermiso: 60},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 61,
                estado: true,
                fkPermiso: { idPermiso: 61},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 62,
                estado: true,
                fkPermiso: { idPermiso: 62},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 63,
                estado: true,
                fkPermiso: { idPermiso: 63},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 64,
                estado: true,
                fkPermiso: { idPermiso: 64},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 65,
                estado: true,
                fkPermiso: { idPermiso: 65},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 66,
                estado: true,
                fkPermiso: { idPermiso: 66},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 67,
                estado: true,
                fkPermiso: { idPermiso: 67},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 68,
                estado: true,
                fkPermiso: { idPermiso: 68},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 69,
                estado: true,
                fkPermiso: { idPermiso: 69},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 70,
                estado: true,
                fkPermiso: { idPermiso: 70},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 71,
                estado: true,
                fkPermiso: { idPermiso: 71},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 72,
                estado: true,
                fkPermiso: { idPermiso: 72},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 73,
                estado: true,
                fkPermiso: { idPermiso: 73},
                fkRol: { idRol: 1}
            },
            {
                idRolPermiso: 74,
                estado: true,
                fkPermiso: { idPermiso: 74},
                fkRol: { idRol: 1}
            }



        ]

        
        for (const role of roles) {
            const exists = await this.rolesRepository.findOneBy({ idRol: role.idRol });
            if (!exists) await this.rolesRepository.query(`INSERT INTO roles(id_rol, nombre, estado) VALUES ($1,$2,$3)`,[role.idRol, role.nombre, role.estado]);
        }

        for (const module of modules) {
            const exists = await this.modulosRepository.findOneBy({ idModulo: module.idModulo })
            if (!exists) await this.modulosRepository.query(`INSERT INTO modulos(id_modulo, nombre, icono, estado) VALUES ($1,$2,$3,$4)`,[module.idModulo, module.nombre, module.icono, module.estado]);
        }

        for (const user of users) {
            const exists = await this.usuariosRepository.findOneBy({ idUsuario: user.idUsuario });
            if (!exists) await this.usuariosRepository.query(`INSERT INTO usuarios(id_usuario, documento, nombre, estado, password, fk_rol) VALUES ($1,$2,$3,$4,$5,$6)`,[user.idUsuario,user.documento,user.nombre,user.estado,user.password,user.fkRol.idRol]);
        }

        for (const ruta of rutas) {
            const exists = await this.rutasRepository.findOneBy({ idRuta: ruta.idRuta });
            if (!exists) await this.rutasRepository.query(`INSERT INTO rutas(id_ruta, nombre, href, fk_modulo, icono, listed, estado) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[ruta.idRuta,ruta.nombre,ruta.href,ruta.fkModulo.idModulo,ruta.icono,ruta.listed,ruta.estado]);
        }

        for (const permiso of permisos) {
            const exists = await this.permisosRepository.findOneBy({ idPermiso: permiso.idPermiso });
            if (!exists) await this.permisosRepository.query(`INSERT INTO permisos(id_permiso, permiso, fk_ruta) VALUES ($1,$2,$3)`,[permiso.idPermiso,permiso.permiso,permiso.fkRuta.idRuta]);
        }

        for (const rolPermiso of rol_permiso) {
            const exists = await this.rolPermisoRepository.findOneBy({ idRolPermiso: rolPermiso.idRolPermiso })
            if (!exists) await this.rolPermisoRepository.query(`INSERT INTO rol_permiso(id_rol_permiso, estado, fk_permiso, fk_rol) VALUES ($1,$2,$3,$4)`,[rolPermiso.idRolPermiso,rolPermiso.estado,rolPermiso.fkPermiso.idPermiso,rolPermiso.fkRol.idRol]);
        }

        console.log("Seeding completado!");
    }



}
