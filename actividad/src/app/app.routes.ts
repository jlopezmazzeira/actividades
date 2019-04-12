import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/guards/login.guard';
import { RecoverGuard } from './services/guards/recover.guard';
import { RecoverPasswordComponent } from './login/recover-password.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'recover-password/:id/:token',
    component: RecoverPasswordComponent,
    canActivate: [RecoverGuard]
  },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
