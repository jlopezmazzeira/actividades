import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService, ProyectoService, HorasTrabajoService } from '../../services/services.index';
import { ModalActividadService } from './modal-actividad.service';
import { Proyecto } from '../../models/proyecto.model';
import { Actividad } from '../../models/actividad.model';

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styles: []
})
export class ModalActividadComponent implements OnInit {

  // @Input('test') nombre: string = 'hola';
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
      // this._serviceModalActividad.notificacion.emit(resp);
      // this.cerrarModal();
    });
  }

  actualizarHoraTrabajo() {
    const id = this._serviceModalActividad.id;
    console.log(id);
    this._serviceModalActividad.notificacion.emit('resp');
    this.cerrarModal();
  }

  eliminarHoraTrabajo() {
    this._serviceModalActividad.notificacion.emit('resp');
    this.cerrarModal();
  }



}
