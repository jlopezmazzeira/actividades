import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Pipes
 import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ActividadComponent } from './actividades/actividad.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ActividadesComponent } from './actividades/actividades.component';

@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,
    ProfileComponent,
    UsuariosComponent,
    // ModalUploadComponent,
    ProyectosComponent,
    ProyectoComponent,
    UsuariosComponent,
    UsuarioComponent,
    ActividadComponent,
    ActividadesComponent,
    BuscadorComponent,
    ActividadComponent
  ],
  exports: [
    // PagesComponent,
    DashboardComponent,
    // ProgressComponent,
    // Graficas1Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
    // ChartsModule,
  ]

})

export class PagesModule { }
