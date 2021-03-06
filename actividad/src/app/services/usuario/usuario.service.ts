import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public router: Router,
              public http: HttpClient,
              public _subirArchivoService: SubirArchivoService) {
  this.cargarStorage();
  }

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

  guardarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    if (usuario._id) {
      url += '/' + usuario._id;
      url += '?token=' + this.token;

      return this.http.put(url, usuario).pipe(map((resp: any) => {

        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
      }));

    } else {
      return this.http.post(url, usuario)
            .pipe(map((resp: any) => {
              swal('Usuario creado', usuario.correo, 'success');
              return resp.usuario;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
            }));
    }

  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

      if (usuario._id === this.usuario._id) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }

      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }),
    catchError( err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
    }));
  }

  buscarUsuario(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp.usuarios;
      }));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    // Cuando no quede un usuario en la lista regresar al listado principal
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    }));
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;

      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
      return true;
    })
    .catch( resp => {
      console.log(resp);
    });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    url += '&token=' + this.token;

    return this.http.get(url);
  }

  actualizarContrasenia(password: string) {
    let url = URL_SERVICIOS + '/usuario/cambiar-password/' + this.usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, {password}).pipe(map((resp: any) => {
      swal('Contraseña actualizada', '', 'success');
      return true;
    }),
    catchError( err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
    }));
  }

  cargarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.get(url).pipe(map((resp: any) => {
      return resp.usuario;
    }));

  }

  recuperarContrasenia(correo: string) {
    const url = URL_SERVICIOS + '/email';

    return this.http.post(url, {correo}).pipe(map((resp: any) => {
      swal('Recuperar contraseña', 'Se le ha enviado un mail', 'success');
      return true;
    }),
    catchError( err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
    }));
  }

  recoverContrasenia(id: string, password: string) {
    const url = URL_SERVICIOS + '/login/recover-password/' + id;

    return this.http.put(url, {password}).pipe(map((resp: any) => {
      this.router.navigate(['/login']);
      swal('Contraseña actualizada', '', 'success');
    }),
    catchError( err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
    }));
  }

  verificarTokenEmail(id: string, token: string) {
    const url = URL_SERVICIOS + '/login/verificar-token/' + id;
    return this.http.post(url, {token}).pipe(map((resp: any) => {
      return true;
    }),
    catchError( err => {
      this.router.navigate(['/login']);
      swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
    }));
  }

  asignarProyectoUsuario(id: string, proyecto: string) {
    let url = URL_SERVICIOS + '/usuario/asignar-proyectos/' + id;
    url += '?token=' + this.token;

    return this.http.put(url, {'proyecto': proyecto}).pipe(map((resp: any) => {
      return resp.usuario;
    }));
  }

  eliminarProyectoAsignado(id: string, proyecto: string) {
    let url = URL_SERVICIOS + '/usuario/eliminar-proyecto/' + id;
    url += '?token=' + this.token;

    return this.http.put(url, {'proyecto': proyecto}).pipe(map((resp: any) => {
      return resp.usuario;
    }));
  }

  usuarios() {
    let url = URL_SERVICIOS + '/usuario/todos-usuarios';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

}
