import {Injectable} from '@angular/core';
import {BaseGuard} from './base-guard';
import {PERMISSION_VIEW, PermissionModels} from '@api/permissions';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';

@Injectable({
  providedIn: 'root'
})
export class CanViewEmployeesGuard extends BaseGuard {

  constructor(store: Store<fromRoot.State>) {
    super(store, PERMISSION_VIEW, PermissionModels.employee);
  }
}
