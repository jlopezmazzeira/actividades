import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public router: Router,
              public http: HttpClient) { }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.correo);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {

      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }),
    catchError( err => {
        swal('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
    }));
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
    .pipe(map((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      return true;
    }),
    catchError( err => {
      this.router.navigate(['/login']);
      swal('No se pudo renovar token', 'No fue posible renovar el token', 'error');
        return throwError(err);
    }));
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


}
