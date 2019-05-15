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
  @Input() doughnutChartLabels: string[] = ['Horas trabajadas', 'Horas faltantes'];
  @Input() doughnutChartLabelsP: string[] = ['Porcentaje trabajado', 'Porcentaje faltante'];
  @Input() doughnutChartData: number[] = [];
  @Input() doughnutChartDataP: number[] = [];
  @Input() doughnutChartType = 'doughnut';

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
        this.doughnutChartData = [totalHoras, horasRestantes];

        this.horasPorcentaje = Math.round(this.proyectoObtenido.cantidadHoras / totalHoras);
        this.porcentajeFaltante = 100 - this.horasPorcentaje;
        this.doughnutChartDataP = [this.horasPorcentaje, this.porcentajeFaltante];
      });
    });

  }

}
