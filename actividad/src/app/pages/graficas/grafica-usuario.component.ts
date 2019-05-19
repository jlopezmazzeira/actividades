import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService, HorasTrabajoService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-grafica-usuario',
  templateUrl: './grafica-usuario.component.html',
  styles: []
})
export class GraficaUsuarioComponent implements OnInit {

  leyenda = 'Horas trabajas por usuario';
  @Input() doughnutChartLabels: string[] = ['Con Natilla', 'Con tocino'];
  @Input() doughnutChartData: number[] = [54, 46];
  @Input() doughnutChartType = 'doughnut';
  
  cargando = true;
  graficas: any = {};
  usuarios: Usuario[] = [];
  usuarioObtenido: Usuario = new Usuario('', '', '', '');
  usuarioSeleccionado = '';

  constructor(public _serviceUsuario: UsuarioService,
    public _serviceHorasTrabajo: HorasTrabajoService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;

    this._serviceUsuario.usuarios().subscribe(
      (resp: any) => {
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  mostrarGraficaProyecto() {}

}
