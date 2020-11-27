import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

import {AppointmentAdminClient} from '@api/clients';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Appointment} from '@api/models';
import {MatDialog} from '@angular/material/dialog';
import {BaseEffectsWithDialog} from '@shared/state/base/effects';

import * as fromAppointments from '@app/admin-appointments/state/index';

import {CreateAppointmentDialogComponent} from '@app/admin-appointments/containers/create-appointment/create-appointment-dialog.component';
import {AppointmentEventDialogComponent} from '@app/admin-appointments/containers/appointment-event/appointment-event-dialog.component';


@Injectable()
export class AppointmentsEffects extends BaseEffectsWithDialog<Appointment> {

  constructor(actions$: Actions,
              store: Store<fromAppointments.State>,
              private appointmentAdminClient: AppointmentAdminClient,
              dialog: MatDialog) {
    super(actions$, appointmentAdminClient, fromAppointments.actions, fromAppointments.selectors, store
      , dialog, AppointmentEventDialogComponent);
  }

  @Effect()
  updateSelfAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.requestSelfAppointmentUpdate),
    map((action) => action.entity),
    mergeMap((apt: Appointment) => this.appointmentAdminClient.updateLock(apt.id, apt).pipe(
      map(updatedAppointment => {
        this.afterSuccess();
        return fromAppointments.actions.upsertOne({entity: updatedAppointment});
      }),
      catchError(error => of(fromAppointments.actions.setError({error})))
      )
    )
  );

  @Effect()
  requestAppointmentHistory$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.requestAppointmentHistory),
    withLatestFrom(this.store.select(fromAppointments.selectors.getCurrentId)),
    switchMap(([action, id]) => this.appointmentAdminClient.history(id).pipe(
      map(result => result.results),
      map(appointments => fromAppointments.actions.setAppointmentHistory({appointments})),
      catchError(error => of(fromAppointments.actions.setError({error})))
      )
    )
  );

  @Effect()
  CreateSelfAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.requestSelfAppointmentCreate),
    map(action => action.entity),
    mergeMap((appointment: Appointment) => this.appointmentAdminClient.createLock(appointment).pipe(
      map(newAppointment => {
        this.afterSuccess();
        return fromAppointments.actions.upsertOne({entity: newAppointment});
      }),
      catchError(error => of(fromAppointments.actions.setError({error})))
      )
    )
  );

  @Effect()
  OpenCreateAppointmentDialog$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.openCreateAppointmentDialog),
    map(payload => {
      this.dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {width: '44rem'});
      return fromAppointments.actions.initializeCurrentAppointment(payload);
    })
  );

  @Effect()
  OpenCreateSelfAppointmentDialog$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.openCreateSelfAppointmentDialog),
    map(payload => {
      this.dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {width: '44rem'});
      return fromAppointments.actions.initializeCurrentSelfAppointment(payload);
    })
  );
}
