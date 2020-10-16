import {Injectable} from '@angular/core';
import {BaseGuard} from './base-guard';
import {Service} from '@api/models';
import {PERMISSION_VIEW} from '@api/permissions';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';

@Injectable({
  providedIn: 'root'
})
export class CanViewServicesGuard extends BaseGuard {

  constructor(store: Store<fromRoot.State>) {
    super(store, PERMISSION_VIEW, Service.modelType);
  }
}

