import {Moment} from 'moment';
import {Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TimeOfDay} from '@api/models/TimeOfDay';


export class CalendarComponents implements OnInit {
  calendarHours: TimeOfDay[];
  @Input() minStart = 6;
  @Input() maxStart = 23;

  private _date: Moment;
  @Input() set date(date: Moment) {
    this._date = date.clone().startOf('day');
    const currentTime = moment.utc();
    this.isToday = this.date.isSame(currentTime, 'day');
  }

  get date(): Moment {
    return this._date;
  }

  isToday: boolean;

  get markerTop(): number {
    const currentTime = moment.utc();
    return  (currentTime.hour() * 60 + currentTime.minute() - this.minStart * 60) * 2;
    // return value.toString() + 'px';
  }

  ngOnInit() {
    this.calendarHours = [];
    for (let i = this.minStart; i <= this.maxStart; i++) {
      this.calendarHours.push(new TimeOfDay(i, 0));
      this.calendarHours.push(new TimeOfDay(i, 30));
    }
  }
}
