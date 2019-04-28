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

  crearHoraTrabajo() { }

  cargarHorasTrabajo(desde: number = 0) {
    let url = URL_SERVICIOS + '/horasTrabajadas/' + this._serviceUsuario.usuario._id + '/?desde=' + desde;
    url += '&token=' + this._serviceUsuario.token;

    return this.http.get(url);
  }

  actualizarHoraTrabajo() { }

  eliminarHoraTrabajo() { }

  obtenerHorasTrabajoProyecto() { }

  obtenerHoraTrabajo() { }
}
