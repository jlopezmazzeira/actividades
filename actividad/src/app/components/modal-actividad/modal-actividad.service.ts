import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalActividadService {

  public title: string;
  public tipo: string;
  public oculto = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.title = null;
    this.tipo = null;
  }

  mostrarModal(title: string, tipo: string) {
    this.oculto = '';
    this.title = title;
    this.tipo = tipo;
  }

}
