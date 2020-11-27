import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Appointment, Employee, Service} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

import {Observable} from 'rxjs';
import {ApiError} from '@api/Errors';
import {AlerterService} from '@shared/services/alerter.service';

import * as fromAppointments from '@app/admin-appointments/state';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromServices from '@app/admin-services/state';
import {expandCollapseAnimation} from '@app/animations';
import {AppointmentPermissions} from '@api/permissions';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event-dialog.component.html',
  styleUrls: ['./appointment-event-dialog.component.scss'],
  animations: [
    expandCollapseAnimation,
    ]
})
export class AppointmentEventDialogComponent implements OnInit, OnDestroy {

  appointment$: Observable<Appointment>;
  history$: Observable<Appointment[]>;
  services$: Observable<Service[]>;
  employees$: Observable<Employee[]>;
  apiError$: Observable<ApiError>;
  permissions$: Observable<AppointmentPermissions>;
  editMode = false;
  showHistory = false;

  constructor(public dialogRef: MatDialogRef<AppointmentEventDialogComponent>,
              private store: Store<State>,
              public alerter: AlerterService) {
  }

  ngOnInit() {
    this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));
    this.store.dispatch(fromServices.actions.initializeStore({params: {}}));
    this.store.dispatch(fromAppointments.actions.requestAppointmentHistory({}));

    this.services$ = this.store.select(fromServices.selectors.selectAll);
    this.employees$ = this.store.select(fromEmployees.selectors.selectAll);
    this.appointment$ = this.store.select(fromAppointments.selectors.getCurrent);
    this.history$ = this.store.select(fromAppointments.selectors.getCurrentAppointmentHistory);
    this.apiError$ = this.store.select(fromAppointments.selectors.getApiError);
    this.permissions$ = this.store.select(fromAppointments.selectors.selectAppointmentPermissions);
  }

  ngOnDestroy() {
    this.store.dispatch(fromAppointments.actions.setAppointmentHistory(null));
  }

  hasService(appointment: Appointment) {
    return !!appointment.service && appointment.service.id !== 0;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleEdit(value: boolean) {
    this.showHistory = false;
    this.editMode = value;
  }

  updateAppointment(appointment: Appointment) {
    this.store.dispatch(fromAppointments.actions.requestUpdate({entity: appointment}));
    this.store.dispatch(fromAppointments.actions.requestAppointmentHistory({}));
  }

  updateSelfAppointment(appointment: Appointment) {
    this.store.dispatch(fromAppointments.actions.requestSelfAppointmentUpdate({entity: appointment}));
    this.store.dispatch(fromAppointments.actions.requestAppointmentHistory({}));
  }

  delete(id) {
    this.alerter.warn('Are you sure?', `this will permanently delete the appointment`)
      .toPromise()
      .then(res => {
        if (res) {
          this.store.dispatch(fromAppointments.actions.requestDelete({id}));
        }
      });
  }
}
