import { Injectable } from '@angular/core';
import {BaseGuard} from '@admin/guards/base-guard';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import {PERMISSION_VIEW} from '@api/permissions';
import {Group, User} from '@api/models';

@Injectable({
  providedIn: 'root'
})
export class CanViewUserGroupsGuard extends BaseGuard {
  constructor(store: Store<fromRoot.State>) {
    super(store, PERMISSION_VIEW, Group.modelType);
  }
}
