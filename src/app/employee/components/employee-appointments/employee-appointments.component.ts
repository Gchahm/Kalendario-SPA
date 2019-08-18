import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {Appointment} from '../../../shared/models/Appointment';
import {Employee} from '../../../shared/models/Employee';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';

@Component({
  selector: 'app-employee-appointments',
  templateUrl: './employee-appointments.component.html',
  styleUrls: ['./employee-appointments.component.css']
})
export class EmployeeAppointmentsComponent implements OnInit {

  @Input() employee: Employee;

  appointments: Appointment[];
  date: Moment;

  constructor(private appointmentService: EmployeeAppointmentService) {
  }

  ngOnInit() {
    this.date = moment.utc().add(1, 'days');
    this.loadAppointments(this.date);
  }

  loadAppointments(date: Moment) {
    this.date = date.clone().utc();
    const fromDate = date.clone().startOf('day');
    const toDate = date.clone().endOf('day');
    this.appointmentService.getList(fromDate.toISOString(), toDate.toISOString())
      .toPromise().then(appointments => {
      this.appointments = appointments;
      this.date = date;
    });
  }

  handleDayRender($event: DateChangedEvent) {
    this.loadAppointments($event.date);
  }

  handleAppointmentBooked($event: Appointment) {
    this.loadAppointments($event.start);
  }
}
