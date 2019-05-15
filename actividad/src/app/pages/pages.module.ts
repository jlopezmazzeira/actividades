import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { UiSwitchModule } from 'ngx-toggle-switch';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Calendario
import { FullCalendarModule } from '@fullcalendar/angular';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActualizarContraseniaComponent } from './usuarios/actualizar-contrasenia.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { GraficaProyectoComponent } from './graficas/grafica-proyecto.component';
import { GraficaUsuarioComponent } from './graficas/grafica-usuario.component';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    UsuariosComponent,
    ProyectosComponent,
    ProyectoComponent,
    UsuariosComponent,
    UsuarioComponent,
    ActividadesComponent,
    ActualizarContraseniaComponent,
    CalendarioComponent,
    GraficaProyectoComponent,
    GraficaUsuarioComponent,
    GraficaDonaComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FullCalendarModule,
    ChartsModule,
    UiSwitchModule
  ]

})

export class PagesModule { }
