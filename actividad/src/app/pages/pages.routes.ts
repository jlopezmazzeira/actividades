import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VerificaTokenGuard } from '../services/services.index';
import { AdminGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActualizarContraseniaComponent } from './usuarios/actualizar-contrasenia.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { GraficaProyectoComponent } from './graficas/grafica-proyecto.component';
import { GraficaUsuarioComponent } from './graficas/grafica-usuario.component';

export const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {titulo: 'Dashboard'},
    canActivate: [VerificaTokenGuard]
  },
  { path: 'calendario', component: CalendarioComponent, data: { titulo: 'Calendario' } },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'grafica-proyecto', component: GraficaProyectoComponent, data: { titulo: 'Gráfica Proyecto'} },
  { path: 'grafica-usuario', component: GraficaUsuarioComponent, data: { titulo: 'Gráfica Usuario'} },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'actualizar-contrasenia', component: ActualizarContraseniaComponent, data: { titulo: 'Actualizar contraseña'} },
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
