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

  constructor() { }

  crearActividad() {

  }

  actualizarActividad() {

  }

  buscarActividad() {

  }

  cargarPActividad() {

  }

  eliminarActividad() {

  }
}
