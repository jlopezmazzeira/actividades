import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HorasTrabajoService {

  constructor(public http: HttpClient,
              public _serviceUsuario: UsuarioService) { }

  crearHoraTrabajo(diaTrabajo: any) {
    let url = URL_SERVICIOS + '/horasTrabajadas/' + this._serviceUsuario.usuario._id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.post(url, diaTrabajo)
               .pipe(map((resp: any) => {
                swal('Actividad creada', '', 'success');
                return resp.diaTrabajadoGuardado;
            }));
  }

  cargarHorasTrabajo(desde: number = 0) {
    let url = URL_SERVICIOS + '/horasTrabajadas/' + this._serviceUsuario.usuario._id + '/?desde=' + desde;
    url += '&token=' + this._serviceUsuario.token;

    return this.http.get(url);
  }

  actualizarHoraTrabajo(id: string, horaTrabajada: any) {
    let url = URL_SERVICIOS + '/horasActividades/' + id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.put(url, horaTrabajada)
               .pipe(map((resp: any) => {
                swal('Actividad actualizada', '', 'success');
                return resp.diaTrabajadoGuardado;
            }));
  }

  eliminarHoraTrabajo(id: string) {
    let url = URL_SERVICIOS + '/horasActividades/' + id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.delete(url);
  }

  obtenerHorasTrabajoProyecto(id: string) {
    let url = URL_SERVICIOS + '/horasActividades/horas-proyecto/' + id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.get(url);
  }

  obtenerHoraTrabajo(id: string) {
    let url = URL_SERVICIOS + '/horasActividades/' + id;
    url += '?token=' + this._serviceUsuario.token;

    return this.http.get(url);
  }
}
