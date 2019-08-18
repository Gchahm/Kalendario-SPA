import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {DateChangedEvent} from '../../events/DateChangedEvent';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('default-date') currentDate;
  @Input('min-date') minDate: Moment;
  @Input('max-date') maxDate: Moment;

  @Output() dayRender = new EventEmitter<DateChangedEvent>();

  constructor() {
  }

  ngOnInit() {
  }

  previousDay() {
    // console.log('start date: ' + this.startDate.toISOString());
    // console.log('current date: ' + this.currentDate.toISOString());
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

  emitDayRender() {
    const event = {
      date: this.currentDate
    };
    this.dayRender.emit(event);
  }
}
