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
  cargando = true;
  graficas: any = {};
  usuarios: Usuario[] = [];
  usuarioObtenido: Usuario = new Usuario('', '', '', '');
  usuarioSeleccionado = '';
  fechaDesde;
  fechaHasta;

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

  mostrarGraficaUsuario() {
    this._serviceHorasTrabajo
        .obtenerHorasTrabajoUsuario(this.usuarioSeleccionado, this.fechaDesde, this.fechaHasta)
        .subscribe((resp: any) => {
          this.usuarioObtenido = resp.usuario;
          const diasTrabajados = resp.diasTrabajados;
          // console.log(diasTrabajados);
          for (const diaTrabajado of diasTrabajados) {
            console.log(diaTrabajado.dia);
            let cantidad = 0;
            for (const horaTrabajada of diaTrabajado.horasTrabajadas) {
              cantidad += horaTrabajada.cantidad;
            }
            console.log(cantidad);
          }
        // this.cargando = false;
      });
  }

}
