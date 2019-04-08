import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuard, VerificaTokenGuard } from '../services/services.index';
import { AdminGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ActividadesComponent } from './actividades/actividades.component';

export const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {titulo: 'Dashboard'},
    canActivate: [VerificaTokenGuard]
  },
  // { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del Tema'} },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'busqueda/:termino', component: BuscadorComponent, data: { titulo: 'Buscador'} },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // Mantenimientos
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Mantenimiento de Usuarios'}
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Mantenimiento de Proyectos'}
  },
  {
    path: 'actividades',
    component: ActividadesComponent,
    data: {titulo: 'Mantenimiento de Actividades'}
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
