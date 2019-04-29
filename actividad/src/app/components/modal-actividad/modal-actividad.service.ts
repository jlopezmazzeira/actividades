import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalActividadService {

  public tipo: string;
  public oculto = 'oculto';
  public date: Date = null;
  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.date = null;
  }

  mostrarModal(tipo: string, date: Date = null) {
    this.oculto = '';
    this.tipo = tipo;
    this.date = date;
  }

}
