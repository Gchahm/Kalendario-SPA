  import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {GroupAdminClient} from '@api/clients';
import {IGroup} from '@api/models';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as fromGroups from '@admin/state/groups';
import {BaseEffects} from '@shared/state/base/effects';

@Injectable()
export class GroupsEffects extends BaseEffects<IGroup> {
  constructor(actions$: Actions,
              store: Store<fromGroups.State>,
              private groupAdminClient: GroupAdminClient) {
    super(actions$, groupAdminClient, fromGroups.actions, fromGroups.selectors, store);
  }

  @Effect()
  loadPermissions$: Observable<Action> = this.actions$.pipe(
    ofType(fromGroups.actions.requestLoadPermissions),
    mergeMap(action =>
      this.groupAdminClient.permissions().pipe(
        map(permissions => fromGroups.actions.addPermissions({permissions})),
        catchError(error => of(fromGroups.actions.setError({error})))
      )
    )
  );
}
