import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { Proyecto } from '../../models/proyecto.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(public http: HttpClient,
              public _serviceUsuario: UsuarioService) { }

  crearProyecto() {

  }

  actualizarProyecto() {

  }

  buscarProyecto() {

  }

  cargarProyectos(desde: number = 0) {
    const url = URL_SERVICIOS + '/proyecto?desde=' + desde;

    return this.http.get(url);
  }

  eliminarProyecto() {

  }

  asignarProyectoUsuario() {

  }

  asignarActividadesProyecto() {

  }

  cargarProyecto(id: string) {
    let url = URL_SERVICIOS + '/proyecto/' + id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.get(url).pipe(map((resp: any) => {
      return resp.proyecto;
    }));

  }


}
