import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuard, VerificaTokenGuard } from '../services/services.index';
import { AdminGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActualizarContraseniaComponent } from './usuarios/actualizar-contrasenia.component';
import { CalendarComponent } from '../components/calendar/calendar.component';

export const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {titulo: 'Dashboard'},
    canActivate: [VerificaTokenGuard]
  },
  {
    path: 'calendario',
    component: CalendarComponent,
    data: {titulo: 'Calendario'}
  },
  // { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del Tema'} },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'actualizar-contrasenia', component: ActualizarContraseniaComponent, data: { titulo: 'Actualizar contraseña'} },
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
    path: 'usuario/:id',
    component: UsuarioComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Usuario'}
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Mantenimiento de Proyectos'}
  },
  {
    path: 'proyecto/:id',
    component: ProyectoComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Proyecto'}
  },
  {
    path: 'actividades',
    component: ActividadesComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Mantenimiento de Actividades'}
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
