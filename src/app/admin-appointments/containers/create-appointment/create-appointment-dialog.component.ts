import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {Appointment} from '@api/models/Appointment';

import * as fromAppointments from '@app/admin-appointments/state';
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
