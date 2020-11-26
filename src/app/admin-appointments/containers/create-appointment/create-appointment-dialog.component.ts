import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Observable} from 'rxjs';
import {Appointment} from '@api/models/Appointment';

import * as fromAppointments from '@app/admin-appointments/state';
import * as fromServices from '@app/admin-services/state';
import * as fromEmployees from '@app/admin-employee/state';
import {ApiError} from '@api/Errors';
import {Employee, Service} from '@api/models';
import {AppointmentPermissions} from '@api/permissions';

@Component({
  selector: 'employee-form-appointment',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.scss'],
})
export class CreateAppointmentDialogComponent implements OnInit {

  appointment$: Observable<Appointment>;
  services$: Observable<Service[]>;
  employees$: Observable<Employee[]>;
  apiError$: Observable<ApiError>;
  type$: Observable<string>;
  appointmentType = fromAppointments.AppointmentType;
  permissions$: Observable<AppointmentPermissions>;

  constructor(private dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));
    this.store.dispatch(fromServices.actions.initializeStore({params: {}}));

    this.appointment$ = this.store.select(fromAppointments.selectors.getInitializedAppointment);
    this.services$ = this.store.select(fromServices.selectors.selectAll);
    this.employees$ = this.store.select(fromEmployees.selectors.selectAll);
    this.type$ = this.store.select(fromAppointments.selectors.getInitializedAppointmentType);
    this.apiError$ = this.store.select(fromAppointments.selectors.getApiError);
    this.permissions$ = this.store.select(fromAppointments.selectors.selectAppointmentPermissions);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveAppointment(entity: Appointment) {
    this.store.dispatch(fromAppointments.actions.requestCreate({entity}));
  }

  saveSelfAppointment(entity: Appointment){
    this.store.dispatch(fromAppointments.actions.requestSelfAppointmentCreate({entity}));
  }
}
