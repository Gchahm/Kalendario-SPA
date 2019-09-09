import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Moment} from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {BaseAppointment} from '../../../shared/models/BaseAppointment';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {

  appointments: BaseAppointment[];
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
      // .subscribe(apps => apps.map(a => console.log(a)));
      .toPromise().then(appointments => {
      appointments.map(a => console.log(a.id));
      this.appointments = appointments;
      this.date = date;
    });
  }
}
