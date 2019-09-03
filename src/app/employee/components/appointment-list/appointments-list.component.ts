import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../shared/models/Employee';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  @Input() employee: Employee;
  @Input() viewType: AppointmentsListViewType;

  calendarDate: Moment;

  constructor() { }

  ngOnInit() {
    this.calendarDate = moment.utc().add(1, 'days');
  }

  updateCalendar($event: Moment) {
    this.calendarDate = $event.clone();
  }

}

export enum AppointmentsListViewType {
  book = 1,
  pending = 2,
}
