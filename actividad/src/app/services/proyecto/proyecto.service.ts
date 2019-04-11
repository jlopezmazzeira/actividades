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

  guardarProyecto(proyecto: Proyecto) {
    let url = URL_SERVICIOS + '/proyecto';

    if (proyecto._id) {
      // Actualizando
      url += '/' + proyecto._id;
      url += '?token=' + this._serviceUsuario.token;

      return this.http.put(url, proyecto).pipe(map((resp: any) => {
        swal('Proyecto actualizado', proyecto.nombre, 'success');
        return resp.proyecto;
      }));

    } else {
      // Creando
      url += '?token=' + this._serviceUsuario.token;

      return this.http.post(url, proyecto).pipe(map((resp: any) => {
        swal('Proyeco creado', proyecto.nombre, 'success');
        return resp.proyecto;
      }));
    }
  }

  buscarProyecto(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/proyectos/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp.proyectos;
      }));
  }

  cargarProyectos(desde: number = 0) {
    const url = URL_SERVICIOS + '/proyecto?desde=' + desde;

    return this.http.get(url);
  }

  eliminarProyecto(proyecto: Proyecto) {
    let url = URL_SERVICIOS + '/proyecto/' + proyecto._id;
    url += '?token=' + this._serviceUsuario.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Proyecto borrado', 'El proyecto a sido eliminado correctamente', 'success');
      return true;
    }));
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
