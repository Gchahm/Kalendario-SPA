import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {EmployeeAdminClient} from '@api/clients';
import {Employee} from '@api/models';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as fromEmployees from '@app/admin-employee/state/index';
import {BaseEffects} from '@shared/state/base/effects';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';

@Injectable()
export class EmployeesEffects extends BaseEffects<Employee> {
  constructor(actions$: Actions,
              store: Store<fromEmployees.State>,
              private employeeAdminClient: EmployeeAdminClient) {
    super(actions$, employeeAdminClient, fromEmployees.actions, fromEmployees.selectors, store);
  }

  @Effect()
  updateEmployeePhoto$: Observable<Action> = this.actions$.pipe(
    ofType(fromEmployees.actions.requestPhotoUpdate),
    map((action) => action.image),
    mergeMap((imageSnippet: ImageSnippet) => this.employeeAdminClient.uploadProfilePicture(imageSnippet.id, imageSnippet.file).pipe(
        map(res => (fromEmployees.actions.updateOne({update: {id: imageSnippet.id, changes: {photoUrl: res.url}}}))),
        catchError(err => of(fromEmployees.actions.setError(err)))
      )
    )
  );
}
