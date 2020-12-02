import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {AppointmentAdminClient} from '@api/clients';

import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Appointment} from '@api/models';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BaseEffects, BaseEffectsWithDialog} from '@shared/state/base/effects';

import * as fromAppointments from '@app/admin-appointments/state/index';

import {CreateAppointmentDialogComponent} from '@app/admin-appointments/containers/create-appointment/create-appointment-dialog.component';
import {AppointmentEventDialogComponent} from '@app/admin-appointments/containers/appointment-event/appointment-event-dialog.component';


@Injectable()
export class AppointmentsEffects extends BaseEffects<Appointment> {

  dialogRef: MatDialogRef<any>;

  constructor(actions$: Actions,
              store: Store<fromAppointments.State>,
              private appointmentAdminClient: AppointmentAdminClient,
              private dialog: MatDialog) {
    super(actions$, appointmentAdminClient, fromAppointments.actions, fromAppointments.selectors, store);
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
  select$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.select),
    map(({id}) => fromAppointments.actions.requestAppointmentHistory({id}))
  );

  @Effect()
  requestAppointmentHistory$: Observable<Action> = this.actions$.pipe(
    ofType(fromAppointments.actions.requestAppointmentHistory),
    switchMap(({id}) => this.appointmentAdminClient.history(id).pipe(
      map(result => result.results),
      map(appointments => fromAppointments.actions.setAppointmentHistory({appointments})),
      catchError(error => of(fromAppointments.actions.setHistoryApiError({error})))
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
    map(({employee, date, employeeMode}) => {
      this.dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {width: '44rem', data: {employeeMode}});
      return fromAppointments.actions.initializeCurrentAppointment({employee, date});
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

  openAppointmentEventDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(fromAppointments.actions.openAppointmentEventDialog),
    map(({id, employeeMode}) => {
      this.dialogRef = this.dialog.open(AppointmentEventDialogComponent, {width: '44rem', data: {employeeMode}});
      return this.actions.select({id});
    })
  ));

  afterSuccess() {
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
