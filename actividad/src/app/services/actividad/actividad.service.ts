import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { Actividad } from '../../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(public http: HttpClient) { }

  crearActividad(nombre: string) {

  }

  actualizarActividad() {

  }

  buscarActividad() {

  }

  cargarActividades(desde: number = 0) {
    const url = URL_SERVICIOS + '/actividad?desde=' + desde;

    return this.http.get(url);

  }

  eliminarActividad() {

  }
}
