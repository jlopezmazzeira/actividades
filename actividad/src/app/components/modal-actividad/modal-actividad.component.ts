import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService, ProyectoService } from '../../services/services.index';
import { ModalActividadService } from './modal-actividad.service';
import { Proyecto } from '../../models/proyecto.model';
import { Actividad } from '../../models/actividad.model';

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styles: []
})
export class ModalActividadComponent implements OnInit {

  proyectos: Proyecto[] = [];
  actividades: Actividad[] = [];
  proyectoSeleccionado = '';
  actividadSeleccionada = '';

  constructor(public _serviceUsuario: UsuarioService,
              public _serviceModalActividad: ModalActividadService,
              public _serviceProyecto: ProyectoService) { }

  ngOnInit() {
    this.proyectos = this._serviceUsuario.usuario.proyectos;
  }

  cerrarModal() {
    this._serviceModalActividad.ocultarModal();
    this.proyectoSeleccionado = '';
    this.actividadSeleccionada = '';
  }

  mostrarActividadesProyecto() {
    this._serviceProyecto.cargarProyecto(this.proyectoSeleccionado)
    .subscribe( proyecto => {
      this.actividades = proyecto.actividades;
    });
  }

  crearHoraTrabajo() {
    this._serviceModalActividad.notificacion.emit('resp');
    this.cerrarModal();
  }

  actualizarHoraTrabajo() {
    this._serviceModalActividad.notificacion.emit('resp');
    this.cerrarModal();
  }

  eliminarHoraTrabajo() {
    this._serviceModalActividad.notificacion.emit('resp');
    this.cerrarModal();
  }



}
