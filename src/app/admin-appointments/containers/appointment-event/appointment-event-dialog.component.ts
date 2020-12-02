import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Appointment} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

import {Observable} from 'rxjs';
import {AlerterService} from '@shared/services/alerter.service';

import * as fromAppointments from '@app/admin-appointments/state';
import {expandCollapseAnimation} from '@app/animations';
import {BaseAppointmentDialog} from '@app/admin-appointments/containers/BaseAppointmentDialog';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event-dialog.component.html',
  styleUrls: ['./appointment-event-dialog.component.scss'],
  animations: [
    expandCollapseAnimation,
    ]
})
export class AppointmentEventDialogComponent extends BaseAppointmentDialog implements OnDestroy {

  history$: Observable<Appointment[]>;
  editMode = false;
  showHistory = false;

  constructor(public dialogRef: MatDialogRef<AppointmentEventDialogComponent>,
              public alerter: AlerterService,
              @Inject(MAT_DIALOG_DATA) public data: { employeeMode: boolean },
              store: Store<State>) {
    super(store, data?.employeeMode);
    this.store.dispatch(fromAppointments.actions.requestAppointmentHistory({}));
    this.history$ = this.store.select(fromAppointments.selectors.getCurrentAppointmentHistory);
    this.appointment$ = this.store.select(fromAppointments.selectors.getCurrent);
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
    this.alerter.warn('Are you sure?', `this will move the appointment to the bin`)
      .toPromise()
      .then(res => {
        if (res) {
          this.store.dispatch(fromAppointments.actions.requestDelete({id}));
        }
      });
  }
}
