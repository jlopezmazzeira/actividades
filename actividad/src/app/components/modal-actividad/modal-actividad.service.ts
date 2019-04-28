import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalActividadService {

  public title: string;
  public tipo: string;
  public oculto = 'oculto';
  public date: Date = null;
  public id: string = null;
  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.title = null;
    this.tipo = null;
    this.date = null;
    this.id = null;
  }

  mostrarModal(title: string, tipo: string, date: Date = null, id: string = null) {
    this.oculto = '';
    this.title = title;
    this.tipo = tipo;
    this.date = date;
    this.id = id;
  }

}
