import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
import {BaseAppointmentDialog} from '@app/admin-appointments/containers/BaseAppointmentDialog';

@Component({
  selector: 'employee-form-appointment',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.scss'],
})
export class CreateAppointmentDialogComponent extends BaseAppointmentDialog {

  constructor(private dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employeeMode: boolean },
              store: Store<State>) {
    super(store, data?.employeeMode);
    this.appointment$ = this.store.select(fromAppointments.selectors.getInitializedAppointment);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveAppointment(entity: Appointment) {
    this.store.dispatch(fromAppointments.actions.requestCreate({entity}));
  }

  saveSelfAppointment(entity: Appointment) {
    this.store.dispatch(fromAppointments.actions.requestSelfAppointmentCreate({entity}));
  }
}
