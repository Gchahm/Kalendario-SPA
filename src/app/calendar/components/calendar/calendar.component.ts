import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {DateChangedEvent} from '../../events/DateChangedEvent';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  minDate: Moment;

  @Input('default-date') currentDate;
  @Input('max-date') maxDate: Moment;

  @Input('min-date') set date(value: Moment) {
    if (!this.minDate) {
      this.minDate = value.clone();
    }
  }

  @Output() dayRender = new EventEmitter<DateChangedEvent>();

  constructor() {
  }

  ngOnInit() {
  }

  today() {
    this.currentDate = moment.utc();
    this.emitDayRender();
  }

  previousDay() {
    if (!this.minDate || this.minDate && this.currentDate > this.minDate) {
      this.currentDate.subtract(1, 'days');
      this.emitDayRender();
    }
  }

  nextDay() {
    if (!this.maxDate || this.maxDate && this.currentDate < this.maxDate) {
      this.currentDate.add(1, 'days');
      this.emitDayRender();
    }
  }

  prevDisabled(): boolean {
    return this.minDate && this.minDate.toISOString() === this.currentDate.toISOString();
  }

  emitDayRender() {
    const event = {
      date: this.currentDate
    };
    this.dayRender.emit(event);
  }
}
