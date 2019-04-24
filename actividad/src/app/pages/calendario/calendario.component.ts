import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {

  options: OptionsInput;
  events: any = [];
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;

  constructor() { }

  ngOnInit() {
    this.options = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      selectable: true,
      locale: esLocale,
      validRange: {
        end: '2019-04-24'
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
    // });
  }

  eventClick(model) {
    const event = this.fullcalendar.calendar.getEventById('9');
    event._def.title = 'hola';
    this.fullcalendar.calendar.rerenderEvents();
    // event.remove();
  }

  dateClick(model) {
    const date = new Date(model.dateStr + 'T15:30:00');
    this.fullcalendar.calendar.addEvent({
      title: 'Hola Event',
      start: date,
      end: date,
      id: '10'
    });
  }

  updateEvents() {
    this.fullcalendar.calendar.getEventById('9');
  }

  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

}
