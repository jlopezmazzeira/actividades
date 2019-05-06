import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { Actividad } from '../../models/actividad.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(public http: HttpClient,
              public _serviceUsuario: UsuarioService) { }

  crearActividad(nombre: string) {
    let url = URL_SERVICIOS + '/actividad';
    url += '?token=' + this._serviceUsuario.token;

    return this.http.post(url, {nombre})
               .pipe(map((resp: any) => {
                swal('Actividad creada', resp.actividad.nombre, 'success');
                return resp.actividad;
            }));
  }

  actualizarActividad(actividad: Actividad) {
    let url = URL_SERVICIOS + '/actividad/' + actividad._id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.put(url, actividad)
               .pipe(map((resp: any) => {
                swal('Actividad actualizado', resp.actividad.nombre, 'success');
                return resp.actividad;
            }));
  }

  buscarActividad(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/actividades/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp.actividades;
      }));
  }

  cargarActividades(desde: number = 0) {
    let url = URL_SERVICIOS + '/actividad?desde=' + desde;
    url += '&token=' + this._serviceUsuario.token;

    return this.http.get(url);

  }

  eliminarActividad(actividad: Actividad) {
    let url = URL_SERVICIOS + '/actividad/' + actividad._id;
    url += '?token=' + this._serviceUsuario.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Actividad borrada', 'La activida a sido eliminada correctamente', 'success');
      return true;
    }));
  }
}
