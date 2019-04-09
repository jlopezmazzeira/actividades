import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model';
import { ActividadService } from '../../services/services.index';
declare var swal: any;

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styles: []
})
export class ActividadesComponent implements OnInit {

  actividades: Actividad[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public _serviceActividad: ActividadService) { }

  ngOnInit() {
    this.cargarActividades();
  }

  cargarActividades() {
    this.cargando = true;

    this._serviceActividad.cargarActividades(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.actividades = resp.actividades;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarActividades();
  }

  crearActividad() {
    swal({
      title: 'Crear Actividad',
      text: 'Ingrese el nombre de la actividad',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    })
    .then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      /*this._serviceActividad.crearActividad(valor)
      .subscribe(() => this.cargarActividades());*/
    });
  }

  guardarActividad(actividad: Actividad) {

  }

  borrarActividad(actividad: Actividad) {
    
  }

}
