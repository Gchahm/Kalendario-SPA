import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../shared/models/Employee';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-appointments',
  templateUrl: './employee-appointments.component.html',
  styleUrls: ['./employee-appointments.component.css']
})
export class EmployeeAppointmentsComponent implements OnInit {

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
  lockTime = 2,
  pending = 3,
}
