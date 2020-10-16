import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

import {CompanyAdminClient} from '@api/clients';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as actions from './companyActions';
import * as fromCore from '@core/state';
import * as fromCompany from '@admin/state/company';
import {getCurrentUser} from '@core/state';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';


@Injectable()
export class ConfigsEffects {
  constructor(private actions$: Actions,
              private coreStore: Store<fromCore.CoreState>,
              private companyStore: Store<fromCompany.State>,
              private client: CompanyAdminClient) {
  }

  @Effect()
  requestCompany$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestCompany),
    withLatestFrom(this.coreStore.pipe(getCurrentUser)),
    mergeMap(([action, user]) =>
      this.client.detail(user.company.id).pipe(
        map(company => (new actions.SetCompany(company))),
        catchError(err => of(new actions.SetApiError(err)))
      )
    )
  );

  @Effect()
  requestUpdateCompany$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestUpdateCompany),
    map((action: actions.RequestUpdateCompany) => [action.id, action.partial]),
    mergeMap(([id, company]) =>
      this.client.patch(id, company).pipe(
        map(updatedConfig => (new actions.SetCompany(updatedConfig))),
        catchError(err => of(new actions.SetApiError(err)))
      )
    )
  );

  @Effect()
  requestUpdateConfig$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestUpdateConfig),
    map((action: actions.RequestUpdateConfig) => [action.id, action.partial]),
    mergeMap(([id, config]) =>
      this.client.config(id, config).pipe(
        map(updatedConfig => (new actions.SetConfig(updatedConfig))),
        catchError(err => of(new actions.SetApiError(err)))
      )
    )
  );

  @Effect()
  RequestPhotoChange$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestPhotoUpdate),
    map((action: actions.RequestPhotoUpdate) => action.image),
    mergeMap((imageSnippet: ImageSnippet) => this.client.uploadProfilePicture(imageSnippet.id, imageSnippet.file).pipe(
      map(updatedConfig => (new actions.SetCompany(updatedConfig))),
      catchError(err => of(new actions.SetApiError(err)))
      )
    )
  );

  @Effect({dispatch: false})
  RequestCreateStripeAccount$ = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestCreateStripeAccount),
    withLatestFrom(this.coreStore.pipe(getCurrentUser)),
    mergeMap(([action, user]) => this.client.stripeUrl(user.company.id).pipe(
      map(result => window.location.href = result.url),
      catchError(err => of(new actions.SetApiError(err)))
      )
    )
  );

  @Effect()
  RequestStripeDetails$ = this.actions$.pipe(
    ofType(actions.ActionTypes.RequestStripeDetails),
    withLatestFrom(this.coreStore.pipe(getCurrentUser)),
    mergeMap(([action, user]) => this.client.stripeDetails(user.company.id).pipe(
      map(result => (new actions.SetStripeDetails(result))),
      catchError(err => of(new actions.SetApiError(err)))
      )
    )
  );
}
