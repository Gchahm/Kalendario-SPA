import {Component, OnInit} from '@angular/core';
import {BaseDetailsComponent} from '../BaseDetailsComponent';
import {Customer} from '../../../../core/models/Customer';
import {AppointmentService} from '../../../../shared/services/appointment.service';
import {Appointment} from '../../../../core/models/Appointment';
import {AppointmentEventDialogComponent} from '../../_dialogs/appointment-event/appointment-event-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {Observable} from 'rxjs';
import {Service} from '../../../../core/models/Service';
import {Employee} from '../../../../core/models/Employee';
import {FormBuilder} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'admin-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent extends BaseDetailsComponent<Customer> implements OnInit {

  displayedColumns: string[] = ['start', 'employee', 'service'];
  appointmentData: AppointmentData[];
  appointments: Appointment[];
  @select((s: IAppState) => s.admin.services) services$: Observable<Service[]>;
  @select((s: IAppState) => s.admin.employees) employees$: Observable<Employee[]>;
  form;

  constructor(private appointmentService: AppointmentService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      from_date: moment.utc(),
      to_date: moment.utc().add(3, 'd'),
      employees: [[]],
      services: [[]],
    });
    this.loadAppointments();
  }

  afterSetModel() {
    if (this.form) {
      this.form.patchValue({customer: this.model.id});
      this.loadAppointments();
    }
  }

  loadAppointments() {
    this.appointmentService.get(this.form.value)
      .toPromise()
      .then(result => {
        this.appointmentData = result.results.map(a => transformAppointment(a));
        this.appointments = result.results;
      }).catch(error => {

    })
  }

  onLineClick(row: AppointmentData) {
    const appointment = this.appointments.find(m => m.id === row.id);
    this.dialog.open(AppointmentEventDialogComponent, {
      width: '400px',
      data: {appointment}
    });
  }
}

interface AppointmentData {
  id: number;
  start: string;
  employee: string;
  service: string;
}

function transformAppointment(appointment: Appointment): AppointmentData {
  return {
    id: appointment.id,
    start: appointment.start.format('DD/MM/YYYY'),
    employee: appointment.employee.name,
    service: appointment.service.name
  };
}

