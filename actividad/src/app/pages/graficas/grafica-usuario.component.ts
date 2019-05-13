import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-usuario',
  templateUrl: './grafica-usuario.component.html',
  styles: []
})
export class GraficaUsuarioComponent implements OnInit {

  leyenda = 'El pan se come con';
  @Input() doughnutChartLabels: string[] = ['Con Natilla', 'Con tocino'];
  @Input() doughnutChartData: number[] = [54, 46];
  @Input() doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
