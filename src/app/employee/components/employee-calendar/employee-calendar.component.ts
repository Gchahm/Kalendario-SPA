import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {BaseAppointment} from '../../../shared/models/BaseAppointment';
import {Employee} from '../../../shared/models/Employee';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {

  appointments: BaseAppointment[];
  date: Moment;
  emp: Employee;

  @Input() set employee(employee: Employee) {
    this.emp = employee;
    if (this.date) {
      this.loadAppointments(this.date);
    }
  }
  @Input() set setDate(date: Moment) {
    this.loadAppointments(date);
    this.date = date;
  }

  @Output() eventClicked = new EventEmitter<Moment>();

  constructor(private appointmentService: EmployeeAppointmentService) {
  }

  ngOnInit() {
    this.loadAppointments(this.date);
  }

  handleDayRender($event: DateChangedEvent) {
    this.loadAppointments($event.date);
  }

  handleEventClick($event: Moment) {
    this.eventClicked.emit($event);
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
