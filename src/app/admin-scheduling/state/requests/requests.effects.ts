import {Injectable} from '@angular/core';

import {RequestModel} from '@api/models';

import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as fromRequests from '@app/admin-scheduling/state/requests/index';
import {BaseEffects} from '@shared/state/base/effects';
import {RequestAdminClient} from '@api/clients/RequestAdminClient';
import {catchError, mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Action} from 'redux';

@Injectable()
export class RequestsEffects extends BaseEffects<RequestModel> {
  constructor(actions$: Actions,
              store: Store<fromRequests.State>,
              private requestAdminClient: RequestAdminClient) {
    super(actions$, requestAdminClient, fromRequests.actions, fromRequests.selectors, store);
  }

  @Effect()
  acceptAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(fromRequests.actions.acceptRequest),
    mergeMap(action => this.requestAdminClient.accept(action.id).pipe(
      mergeMap(entity => ([
        fromRequests.actions.removeOne({id: entity.id}),
        fromRequests.actions.selectNext({})
      ])),
      catchError(err => of(fromRequests.actions.setError(err)))
      )
    )
  );

  @Effect()
  rejectAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(fromRequests.actions.rejectRequest),
    mergeMap(action => this.requestAdminClient.reject(action.id).pipe(
      mergeMap(entity => ([
        fromRequests.actions.removeOne({id: entity.id}),
        fromRequests.actions.selectNext({})
      ])),
      catchError(err => of(fromRequests.actions.setError(err)))
      )
    )
  );

}
