import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarComponent } from 'ng-fullcalendar';
import { ModalActividadService } from '../../components/modal-actividad/modal-actividad.service';
import { HorasTrabajoService } from '../../services/services.index';
import { ModalActividadComponent } from '../../components/modal-actividad/modal-actividad.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {

  options: OptionsInput;
  events: any[] = [];
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  @ViewChild(ModalActividadComponent) modalActividad: ModalActividadComponent;
  cargando = true;
  desde = 0;
  totalRegistros = 0;

  constructor(public _serviceModalActividad: ModalActividadService,
              public _serviceHorasTrabajo: HorasTrabajoService) { }

  ngOnInit() {
    this._serviceModalActividad.notificacion
    .subscribe( resp => {
      this.clearEvents();
      this.loadEvents();
    });

    this.options = {
      editable: false,
      eventLimit: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      selectable: true,
      locale: esLocale,
      validRange: {
        end: new Date()
      },
      events: [],
      plugins: [ dayGridPlugin, interactionPlugin ]
    };

    this.loadEvents();
  }

  loadEvents() {
    this._serviceHorasTrabajo.cargarHorasTrabajo(this.desde).subscribe(
      (resp: any) => {
        const dias = resp.diasTrabajados;
        const events = [];
        for (const dia of dias) {
          for (const elemento of dia.horasTrabajadas) {
            events.push({
              title: elemento.actividad.nombre,
              start: this.fechaTrabajo(dia.dia),
              id: elemento._id
            });
          }
        }
        this.events = events;
        this.cargando = false;
    });
  }

  clearEvents() {
    this.fullcalendar.eventsModel = [];
  }

  eventClick(info) {
    const id = info.event._def.publicId;
    this.modalActividad.titulo = 'Editar actividad';
    this._serviceModalActividad.mostrarModal('update', null);
    this.modalActividad.cargarHora(id);
  }

  dateClick(info) {
    let date: any = new Date(info.dateStr);
    date = this.fechaTrabajo(date);
    this.modalActividad.titulo = 'Agregar actividad';
    this._serviceModalActividad.mostrarModal('add', date);
  }

  fechaTrabajo(dia) {
    const dateObj = new Date(dia);
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1) + '-' + dateObj.getUTCDate();
  }

}
