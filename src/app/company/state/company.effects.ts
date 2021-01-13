import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {CompanyClient, RequestClient} from '@api/clients';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as actions from './company.actions';
import {ToastService} from '@shared/services/toast.service';
import * as fromCompany from '@company/state/index';
import * as fromCore from '@core/state';
import {SlotsForServiceDialogComponent} from '@company/components/_dialogs/slots-for-service-dialog/slots-for-service-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';


@Injectable()
export class CompanyEffects {

  dialogRef: MatDialogRef<SlotsForServiceDialogComponent>;

  constructor(private actions$: Actions,
              private store: Store<fromCompany.State>,
              private requestClient: RequestClient,
              private companyClient: CompanyClient,
              private toast: ToastService,
              private router: Router,
              private dialog: MatDialog) {
  }

  @Effect()
  RequestCompany$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestCompany),
    map((action: actions.RequestCompany) => action.payload),
    switchMap(companyName => this.companyClient.fromName(companyName).pipe(
      mergeMap(result => [
        new actions.SetCompany(result),
        new actions.RequestCurrentRequest(result.id)
      ]),
      catchError(err => of(new actions.LoadCompanyFail(err)))
      )
    )
  );

  @Effect()
  RequestSlots$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestSlots),
    withLatestFrom(this.store.select(fromCompany.getSlotsParams)),
    mergeMap(([action, params]) => this.companyClient.slots(params).pipe(
      map(slots => (new actions.SetSlots(slots))),
      catchError(err => of(new actions.LoadSlotsFail(err)))
      )
    )
  );

  @Effect()
  RequestCurrentRequest$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestCurrentRequest),
    map((action: actions.RequestCurrentRequest) => action.payload),
    mergeMap(ownerId => this.requestClient.current(ownerId).pipe(
      map(request => (new actions.SetCurrentRequest(request))),
      catchError(err => of(new actions.LoadSlotsFail(err)))
      )
    )
  );

  @Effect()
  UpdateCurrentRequest: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.SetCurrentRequest),
    map((action: actions.SetCurrentRequest) => action.payload),
    map(request => (new fromCore.SetRequestCount(request.itemsCount)))
  );

  @Effect()
  RequestAddAppointmentRequest$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestAddAppointmentRequest),
    withLatestFrom(
      this.store.select(fromCompany.getAddAppointmentWriteModel),
      this.store.select(fromCore.getIsLoggedIn)
    ),
    mergeMap(([action, params, isLoggedIn]) => {
        if (!params) {
          return of(new actions.DoNothing());
        }
        if (!isLoggedIn) {
          this.closeDialog();
          this.router.navigate(['login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url, ...params}});
        }
        return this.requestClient.createAppointment(params).pipe(
          tap(res => this.toast.success('Added to Cart')),
          tap(res => this.closeDialog()),
          mergeMap(res => ([
            new actions.RequestSlots(),
            new actions.SetCurrentRequest(res)
          ])),
          catchError(err => of(new actions.LoadSlotsFail(err)))
        );
      }
    )
  );

  @Effect()
  RequestRemoveAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestRemoveAppointment),
    map((action: actions.RequestRemoveAppointment) => action.payload),
    withLatestFrom(
      this.store.select(fromCompany.getCurrentRequest)
    ),
    mergeMap(([payload, cart]) => {
        return this.requestClient.delete(cart.id, payload.toString(), cart.owner.id.toString()).pipe(
          tap(res => this.toast.success('Appointment removed from Cart')),
          tap(res => this.closeDialog()),
          map(request => (new actions.SetCurrentRequest(request))),
          catchError(err => of(new actions.LoadSlotsFail(err)))
        );
      }
    )
  );

  @Effect()
  AddRequestNotes$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.AddRequestNotes),
    map((action: actions.AddRequestNotes) => action.customerNotes),
    withLatestFrom(this.store.select(fromCompany.getCurrentRequest)),
    mergeMap(([customerNotes, request]) => this.requestClient.patch(request.id, customerNotes).pipe(
      tap(r => this.router.navigate(['c', request.owner.id, 'checkout'])),
      map(result => (new actions.SetCurrentRequest(result))),
      catchError(err => of(new actions.LoadSlotsFail(err)))
      )
    )
  );

  @Effect()
  ConfirmRequest$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ConfirmRequest),
    withLatestFrom(this.store.select(fromCompany.getCurrentRequest)),
    mergeMap(([action, request]) => this.requestClient.complete(request.id).pipe(
      tap(r => this.router.navigate(['my', 'requests'], {queryParams: {id: request.id}})),
      map(result => (new actions.SetCurrentRequest(result))),
      catchError(err => of(new actions.LoadSlotsFail(err)))
      )
    )
  );

  @Effect()
  RequestPaymentDetails$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestPaymentDetails),
    map((action: actions.RequestPaymentDetails) => action.id),
    mergeMap((id) => this.requestClient.payment(id).pipe(
      map(result => (new actions.SetPaymentDetails(result))),
      catchError(err => of(new actions.LoadSlotsFail(err)))
      )
    )
  );

  @Effect({dispatch: false})
  OpenSlotsForServiceDialog$ = this.actions$.pipe(
    ofType(actions.ActionTypes.OpenSlotsForServiceDialog),
    map((action: actions.SetCurrentRequest) => {
        this.dialogRef = this.dialog.open(SlotsForServiceDialogComponent, {width: '90vw'});
      }
    ),
  );

  closeDialog() {
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
