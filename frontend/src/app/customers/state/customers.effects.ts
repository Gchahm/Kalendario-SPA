import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as actions from './customers.actions';
import {Injectable} from '@angular/core';
import {RequestClient} from '@api/clients';


@Injectable()
export class CustomersEffects {
  constructor(private actions$: Actions,
              private requestClient: RequestClient) {
  }

  @Effect()
  initializeStore$: Observable<Action> = this.actions$.pipe(
    ofType(actions.initializeStore),
    map(({date}) => ({fromDate: date, toDate: date.clone().endOf('month')})),
    mergeMap(({fromDate, toDate}) => this.requestClient.get({fromDate, toDate}).pipe(
      map(result => actions.upsertMany({entities: result.results})),
      catchError(error => of(actions.setError({error})))
    ))
  );


  @Effect()
  requestEntities$: Observable<Action> = this.actions$.pipe(
    ofType(actions.requestEntities),
    map(({date}) => ({fromDate: date, toDate: date.clone().endOf('month')})),
    mergeMap(({fromDate, toDate}) => this.requestClient.get({fromDate, toDate}).pipe(
      map(result => actions.setAll({entities: result.results})),
      catchError(error => of(actions.setError({error})))
    ))
  );

  @Effect()
  requestEntity$: Observable<Action> = this.actions$.pipe(
    ofType(actions.requestEntity),
    mergeMap(({id}) => this.requestClient.detail(id).pipe(
      mergeMap(entity => [
        actions.addOne({entity}),
        actions.setSelectedId({id})
      ]),
      catchError(error => of(actions.setError({error})))
    ))
  );
}
