import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {Observable} from 'rxjs';
import {Appointment} from '../../../shared/models/Appointment';

@Component({
  selector: 'app-customer-appointments',
  templateUrl: './customer-appointments.component.html',
  styleUrls: ['./customer-appointments.component.css']
})
export class CustomerAppointmentsComponent implements OnInit {

  appointments$: Observable<Appointment[]>;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointments$ = this.appointmentService.getAll();
  }

}
