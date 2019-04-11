import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/services.index';
declare var swal: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: []
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public _serviceProyecto: ProyectoService) { }

  ngOnInit() {
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.cargando = true;

    this._serviceProyecto.cargarProyectos(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.proyectos = resp.proyectos;
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

    this.cargarProyectos();
  }

  borrarProyecto(proyecto: Proyecto) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el proyecto: ' + proyecto.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._serviceProyecto.eliminarProyecto(proyecto)
          .subscribe(() => {
            this.desde = 0;
            this.cargarProyectos();
        });
      }
    });
  }

  buscarProyecto(termino: string) {

    if (termino.length <= 0) {
      this.cargarProyectos();
      return;
    }

    this.cargando = true;

    this._serviceProyecto.buscarProyecto(termino)
      .subscribe((proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
        this.cargando = false;
    });
  }

}
