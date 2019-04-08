import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators/';
import swal from 'sweetalert';
import { throwError } from 'rxjs';
import { Proyecto } from '../../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor() { }

  crearProyecto() {

  }

  actualizarProyecto() {

  }

  buscarProyecto() {

  }

  cargarProyectos() {

  }

  eliminarProyecto() {

  }

  asignarProyectoUsuario() {

  }

  asignarActividadesProyecto() {
    
  }


}
