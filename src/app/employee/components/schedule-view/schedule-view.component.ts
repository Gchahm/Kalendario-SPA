import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../shared/models/Employee';
import * as moment from 'moment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {BaseAppointment} from '../../../shared/models/BaseAppointment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';

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
  activePanel = 'book';
  appointments: BaseAppointment[];

  constructor(private appointmentService: EmployeeAppointmentService) {
  }

  ngOnInit() {
    this.date = moment.utc().add(1, 'days');
    this.loadAppointments(this.date);
  }

  updateCalendar($event: Moment) {
    this.date = $event.clone();
  }

  handleDayRender($event: DateChangedEvent) {
    this.loadAppointments($event.date);
  }

  loadAppointments(date: Moment) {
    this.date = date.clone().utc();
    const fromDate = date.clone().startOf('day');
    const toDate = date.clone().endOf('day');
    this.appointmentService.getAccepted(this.emp.id.toString(), fromDate.toISOString(), toDate.toISOString())
      .toPromise().then(appointments => {
      this.appointments = appointments;
      this.date = date;
    });
  }
}

