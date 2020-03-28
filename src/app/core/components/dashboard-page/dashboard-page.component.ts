import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Appointment} from '../../models/Appointment';
import {AppointmentService} from '../../../shared/services/appointment.service';
import * as moment from 'moment';

@Component({
  selector: 'customer-appointments',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  appointments$: Observable<Appointment[]>;
  selectedPeriod = 'future';
  selectedStatus = 'all';

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
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
    const params = {to_date: '', from_date: '', status: ''};
    if (this.selectedPeriod === 'past') { params.to_date = moment.utc().toISOString(); }
    if (this.selectedPeriod === 'future') { params.from_date = moment.utc().toISOString(); }
    if (this.selectedStatus !== 'all') { params.status = this.selectedStatus; }
    this.appointments$ = this.appointmentService.get(params);
  }
}
