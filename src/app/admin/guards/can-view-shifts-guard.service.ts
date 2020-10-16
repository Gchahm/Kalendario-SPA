import {Injectable} from '@angular/core';
import {BaseGuard} from './base-guard';
import {PERMISSION_VIEW} from '@api/permissions';
import {Shift} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';

@Injectable({
  providedIn: 'root'
})
export class CanViewShiftsGuard extends BaseGuard {

  constructor(store: Store<fromRoot.State>) {
    super(store, PERMISSION_VIEW, Shift.modelType);
  }
}

