import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {CalendarEvent} from '../../models/CalendarEvent';
import {DateChangedEvent} from '../../events/DateChangedEvent';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('default-date') currentDate: Moment = moment.utc();
  @Input('events') events: CalendarEvent[];

  @Output() dayRender = new EventEmitter<DateChangedEvent>();
  @Output() agendaEventClicked = new EventEmitter<CalendarEvent>();

  constructor() { }

  ngOnInit() {
  }

  previousDay() {
    this.currentDate.subtract(1, 'days');
    this.emitDayRender();
  }

  nextDay() {
    this.currentDate.add(1, 'days');
    this.emitDayRender();
  }

  emitDayRender() {
    const event = {
      date: this.currentDate
    };
    this.dayRender.emit(event);
  }

  handleAgendaEventClicked($event: CalendarEvent) {
    this.agendaEventClicked.emit($event);
  }
}
