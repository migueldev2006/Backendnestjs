import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ModulosModule } from './modulos/modulos.module';
import { RutasModule } from './rutas/rutas.module';
import { PermisosModule } from './permisos/permisos.module';
import { UsuarioFichaModule } from './usuario-ficha/usuario-ficha.module';
import { FichasModule } from './fichas/fichas.module';
import { ProgramasFormacionModule } from './programas-formacion/programas-formacion.module';
import { AreasModule } from './areas/areas.module';
import { SedesModule } from './sedes/sedes.module';
import { CentrosModule } from './centros/centros.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { TiposSitioModule } from './tipos-sitio/tipos-sitio.module';
import { SitiosModule } from './sitios/sitios.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { TiposMovimientoModule } from './tipos-movimiento/tipos-movimiento.module';
import { CaracteristicasModule } from './caracteristicas/caracteristicas.module';
import { UnidadesMedidaModule } from './unidades-medida/unidades-medida.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ElementosModule } from './elementos/elementos.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { RolPermisoModule } from './rol-permiso/rol-permiso.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AuthModule } from './auth/auth.module';
import { VerificacionesModule } from './verificaciones/verificaciones.module';




@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '//*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true
    }),
    RolesModule,
    UsuariosModule,
    ModulosModule,
    RutasModule,
    PermisosModule,
    UsuarioFichaModule,
    FichasModule,
    ProgramasFormacionModule,
    AreasModule,
    SedesModule,
    CentrosModule,
    MunicipiosModule,
    TiposSitioModule,
    SitiosModule,
    InventariosModule,
    VerificacionesModule,
    MovimientosModule,
    TiposMovimientoModule,
    CaracteristicasModule,
    UnidadesMedidaModule,
    CategoriasModule,
    ElementosModule,
    RolPermisoModule,
    NotificacionesModule,
    AuthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    AppService,
  ],
})
export class AppModule {}
