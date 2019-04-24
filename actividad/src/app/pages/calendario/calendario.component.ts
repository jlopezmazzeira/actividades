import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarComponent } from 'ng-fullcalendar';
import { ModalActividadService } from '../../components/modal-actividad/modal-actividad.service';
import { HorasTrabajoService } from '../../services/services.index';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {

  options: OptionsInput;
  events: any = [];
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  cargando = true;

  constructor(public _serviceModalActividad: ModalActividadService,
              public _serviceHorasTrabajo: HorasTrabajoService) { }

  ngOnInit() {
    this._serviceModalActividad.notificacion
    .subscribe( resp => console.log('hola'));

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
    // this.eventService.getEvents().subscribe(data => {
    this.events = [{
        title: 'Updaten Event',
        start: this.yearMonth + '-07',
        end: this.yearMonth + '-08',
        id: '8'
      },
      {
        title: 'Event',
        start: this.yearMonth + '-08',
        end: this.yearMonth + '-09',
        id: '9'
      }
    ];
    this.cargando = false;
    // });
  }

  eventClick(info) {
    this._serviceModalActividad.mostrarModal('Editar actividad', 'update');
    const event = this.fullcalendar.calendar.getEventById(info.event._def.publicId);
    event._def.title = 'hola';
    this.fullcalendar.calendar.rerenderEvents();
    // event.remove();
  }

  dateClick(info) {
    const date = new Date(info.dateStr + 'T15:30:00');
    this._serviceModalActividad.mostrarModal('Agregar actividad', 'ad');

    this.fullcalendar.calendar.addEvent({
      title: 'Hola Event',
      start: date,
      end: date,
      id: '10'
    });
  }

  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

}
