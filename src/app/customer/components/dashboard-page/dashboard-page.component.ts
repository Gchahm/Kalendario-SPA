import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Appointment} from '../../../core/models/Appointment';
import {AppointmentQParams, AppointmentService} from '../../../shared/services/appointment.service';
import * as moment from 'moment';

@Component({
  selector: 'customer-appointments',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
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
    const params: AppointmentQParams = {};
    if (this.selectedPeriod === 'past') { params.to_date = moment.utc().toISOString(); }
    if (this.selectedPeriod === 'future') { params.from_date = moment.utc().toISOString(); }
    if (this.selectedStatus !== 'all') { params.status = this.selectedStatus; }
    this.appointments$ = this.appointmentService.getAppointments(params);
  }

}
