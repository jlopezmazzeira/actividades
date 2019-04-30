import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService, ProyectoService, HorasTrabajoService } from '../../services/services.index';
import { ModalActividadService } from './modal-actividad.service';
import { Proyecto } from '../../models/proyecto.model';
import { Actividad } from '../../models/actividad.model';
declare var swal: any;

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styles: []
})
export class ModalActividadComponent implements OnInit {

  titulo: string;
  id: string;
  proyectos: Proyecto[] = [];
  actividades: Actividad[] = [];
  proyectoSeleccionado = '';
  actividadSeleccionada = '';
  desde: any;
  hasta: any;

  constructor(public _serviceUsuario: UsuarioService,
              public _serviceModalActividad: ModalActividadService,
              public _serviceProyecto: ProyectoService,
              public _serviceHorasTrabajadas: HorasTrabajoService) { }

  ngOnInit() {
    this.proyectos = this._serviceUsuario.usuario.proyectos;
  }

  cerrarModal() {
    this._serviceModalActividad.ocultarModal();
    this.proyectoSeleccionado = '';
    this.actividadSeleccionada = '';
    this.desde = null;
    this.hasta = null;
  }

  mostrarActividadesProyecto() {
    this._serviceProyecto.cargarProyecto(this.proyectoSeleccionado)
    .subscribe( proyecto => {
      this.actividades = proyecto.actividades;
    });
  }

  crearHoraTrabajo() {
    const dia = {
      dia: this._serviceModalActividad.date,
      horaTrabajada: {
        cantidad: this.calcularCantidadHoras(),
        desde: this.desde,
        hasta: this.hasta,
        proyecto: this.proyectoSeleccionado,
        actividad: this.actividadSeleccionada
      }
    };

    this._serviceHorasTrabajadas.crearHoraTrabajo(dia).subscribe(resp => {
      this._serviceModalActividad.notificacion.emit(resp);
      this.cerrarModal();
    });

  }

  cargarHora(id) {
    this.id = id;
    this._serviceHorasTrabajadas.obtenerHoraTrabajo(this.id).subscribe((resp: any) => {
        this.proyectoSeleccionado = resp.horasActividades.proyecto._id;
        this.actividadSeleccionada = resp.horasActividades.actividad._id;
        this.desde = resp.horasActividades.desde;
        this.hasta = resp.horasActividades.hasta;
        this.mostrarActividadesProyecto();
    });
  }

  actualizarHoraTrabajo() {
    const horaTrabajada = {
      cantidad: this.calcularCantidadHoras(),
      desde: this.desde,
      hasta: this.hasta,
      proyecto: this.proyectoSeleccionado,
      actividad: this.actividadSeleccionada
    };

    this._serviceHorasTrabajadas.actualizarHoraTrabajo(this.id, horaTrabajada).subscribe(resp => {
      this._serviceModalActividad.notificacion.emit(resp);
      this.cerrarModal();
    });
  }

  eliminarHoraTrabajo() {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar la actividad',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._serviceHorasTrabajadas.eliminarHoraTrabajo(this.id).subscribe(resp => {
          this._serviceModalActividad.notificacion.emit(resp);
          this.cerrarModal();
        });
      }
    });
  }

  calcularCantidadHoras() {
    let hasta = this.hasta;
    hasta = hasta.split(':');
    let desde = this.desde;
    desde = desde.split(':');
    const minHasta = (hasta[0] * 60) + Number(hasta[1]);
    const minDesde = (desde[0] * 60) + Number(desde[1]);
    const total = (minHasta - minDesde) / 60;
    return total;
  }



}
