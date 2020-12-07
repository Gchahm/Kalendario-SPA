import { Injectable } from '@angular/core';
import {BaseGuard} from '@admin/guards/base-guard';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import {PERMISSION_VIEW} from '@api/permissions';
import {User} from '@api/models';

@Injectable({
  providedIn: 'root'
})
export class CanViewUsersGuard extends BaseGuard {
  constructor(store: Store<fromRoot.State>) {
    super(store, PERMISSION_VIEW, User.modelType);
  }
}
