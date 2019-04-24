import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { ModalActividadService } from './modal-actividad.service';
import { Proyecto } from '../../models/proyecto.model';
import { Actividad } from '../../models/actividad.model';

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styles: []
})
export class ModalActividadComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public actividades: Actividad[] = [];

  constructor(public _serviceUsuario: UsuarioService,
              public _serviceModalActividad: ModalActividadService) { }

  ngOnInit() {
    this.proyectos = this._serviceUsuario.usuario.proyectos;
  }

  cerrarModal() {
    this._serviceModalActividad.ocultarModal();
  }

  mostrarActividadesProyecto() { }

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
