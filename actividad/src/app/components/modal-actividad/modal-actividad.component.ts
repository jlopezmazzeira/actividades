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
        cantidad: 2,
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
    console.log(id);
    this._serviceHorasTrabajadas.obtenerHoraTrabajo(id).subscribe(resp => {
      console.log(resp);
      /*
        proyectoSeleccionado = '';
        actividadSeleccionada = '';
        desde: any;
        hasta: any; */
    });
  }

  actualizarHoraTrabajo() {
    const horaTrabajada = {
      cantidad: 2,
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



}
