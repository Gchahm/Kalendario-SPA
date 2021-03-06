import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {UserAdminClient} from '@api/clients';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IUser} from '@api/models';
import {BaseEffects} from '@shared/state/base/effects';

import * as fromUsers from '@app/admin-users/state';


@Injectable()
export class UsersEffects extends BaseEffects<IUser> {
  constructor(actions$: Actions,
              store: Store<fromUsers.State>,
              private userAdminClient: UserAdminClient) {
    super(actions$, userAdminClient, fromUsers.actions, fromUsers.selectors, store);
  }

  @Effect()
  ChangeUserPassword$: Observable<Action> = this.actions$.pipe(
    ofType(fromUsers.actions.requestChangeUserPassword),
    mergeMap((payload) =>
      this.userAdminClient.changePassword(payload.id, payload.command).pipe(
        map(user => (fromUsers.actions.changePasswordSuccess(user))),
        catchError(changePassError => of(fromUsers.actions.changePasswordError({changePassError})))
      )
    )
  );

}
