import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../shared/models/Appointment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {Observable} from 'rxjs';
import {Moment} from 'moment';

@Component({
  selector: 'app-appointment-requests',
  templateUrl: './appointment-requests.component.html',
  styleUrls: ['./appointment-requests.component.css']
})
export class AppointmentRequestsComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<Moment>();

  appointments$: Observable<Appointment[]>;

  constructor(private appointmentsService: EmployeeAppointmentService) { }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments$ = this.appointmentsService.getPending();
  }

  handleAppointmentClicked($event: Moment) {
    this.eventClicked.emit($event);
  }
}
