import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../shared/models/Employee';
import * as moment from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {BaseAppointment} from '../../../shared/models/BaseAppointment';

@Component({
  selector: 'employee-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {

  @Input() set employee(employee: Employee) {
    this.emp = employee;
    if (this.date) {
      this.loadAppointments(this.date);
    }
  }

  emp: Employee;
  date: Moment;
  activePanel = 'minimize';
  appointments: BaseAppointment[];

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.date = moment.utc().add(1, 'days');
    this.loadAppointments(this.date);
  }

  updateCalendar($event: Moment) {
    this.loadAppointments($event);
  }

  handleDayRender($event: DateChangedEvent) {
    this.loadAppointments($event.date);
  }

  loadAppointments(date: Moment) {
    this.date = date.clone().utc();
    const fromDate = date.clone().startOf('day');
    const toDate = date.clone().endOf('day');
    this.appointmentService.getAll({
      employee: this.emp.id.toString(),
      from_date: fromDate.toISOString(),
      to_date: toDate.toISOString(),
      status: 'A'
    })
      .toPromise().then(appointments => {
      this.appointments = appointments;
      this.date = date;
    });
  }
}

