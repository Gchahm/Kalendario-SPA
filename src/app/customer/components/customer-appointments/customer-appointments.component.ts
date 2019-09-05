import {Component, OnInit} from '@angular/core';
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
  selectedPeriod: string;
  selectedStatus: string;

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.selectedPeriod = 'future';
    this.selectedStatus = null;
    this.loadAppointments();
  }

  updatePeriod(value: string) {
    this.selectedPeriod = value;
    this.loadAppointments();
  }

  updateStatus(value: string) {
    this.selectedStatus = value;
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments$ = this.appointments();
  }

  private appointments(): Observable<Appointment[]> {
    switch (this.selectedPeriod) {
      case 'future':
        return this.appointmentService.getFuture(this.selectedStatus);
      case 'past':
        return this.appointmentService.getPast(this.selectedStatus);
      default:
        return this.appointmentService.getAll(this.selectedStatus);
    }
  }

}
