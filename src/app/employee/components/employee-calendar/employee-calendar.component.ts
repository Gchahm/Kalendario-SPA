import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../shared/models/Appointment';
import {Moment} from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {

  appointments: Appointment[];
  date: Moment;
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
    this.appointmentService.getAccepted(fromDate.toISOString(), toDate.toISOString())
      .toPromise().then(appointments => {
      this.appointments = appointments;
      this.date = date;
    });
  }
}
