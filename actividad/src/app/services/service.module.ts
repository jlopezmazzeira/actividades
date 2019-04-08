import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivoService,
  LoginGuard,
  AdminGuard,
  VerificaTokenGuard,
  HorasTrabajoService,
  ProyectoService,
  ActividadService} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard,
    HorasTrabajoService,
    ProyectoService,
    ActividadService
  ]
})
export class ServiceModule { }
