import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService, HorasTrabajoService } from '../../services/services.index';
import { Proyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-grafica-proyecto',
  templateUrl: './grafica-proyecto.component.html',
  styles: []
})
export class GraficaProyectoComponent implements OnInit {

  leyenda = 'Horas Trabajas - Proyecto: ';
  graficas: any = {};

  proyectos: Proyecto[] = [];
  proyectoObtenido: Proyecto = new Proyecto('', '', '');
  cargando = true;
  proyectoSeleccionado = '';
  horasPorcentaje = 0;
  porcentajeFaltante = 0;

  constructor(public _serviceProyecto: ProyectoService,
              public _serviceHorasTrabajo: HorasTrabajoService) { }

  ngOnInit() {
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.cargando = true;

    this._serviceProyecto.proyectos().subscribe(
      (resp: any) => {
        this.proyectos = resp.proyectos;
        this.cargando = false;
      });
  }

  mostrarGraficaProyecto() {
    this._serviceProyecto.cargarProyecto(this.proyectoSeleccionado)
    .subscribe(proyecto => {
      this.proyectoObtenido = proyecto;

      this._serviceHorasTrabajo.obtenerHorasTrabajoProyecto(this.proyectoSeleccionado)
      .subscribe((resp: any) => {
        const horasProyecto = resp.horasActividades;
        let totalHoras = 0;

        for (const hora of horasProyecto) {
          totalHoras += hora.cantidad;
        }
        const horasRestantes = this.proyectoObtenido.cantidadHoras - totalHoras;

        if (totalHoras === 0) {
          this.horasPorcentaje = 0;
        } else {
          this.horasPorcentaje = Math.round(this.proyectoObtenido.cantidadHoras / totalHoras);
        }

        this.porcentajeFaltante = 100 - this.horasPorcentaje;

        this.graficas = {
          'graficaHoras': {
            'labels': ['Horas trabajadas', 'Horas faltantes'],
            'data':  [totalHoras, horasRestantes],
            'type': 'doughnut'
          },
          'graficaPorcentaje': {
            'labels': ['Porcentaje trabajado', 'Porcentaje faltante'],
            'data':  [this.horasPorcentaje, this.porcentajeFaltante],
            'type': 'doughnut'
          }
        }
      });
    });

  }

}
