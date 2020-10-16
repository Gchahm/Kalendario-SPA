import { Injectable } from '@angular/core';
import {BaseGuard} from '@admin/guards/base-guard';
import {PERMISSION_ADD} from '@api/permissions';
import {Appointment} from '@api/models/Appointment';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';

@Injectable({
  providedIn: 'root'
})
export class CanBookAppointmentsGuard extends BaseGuard {
  constructor(store: Store<fromRoot.State>,) {
    super(store, PERMISSION_ADD, Appointment.modelType);
  }
}
