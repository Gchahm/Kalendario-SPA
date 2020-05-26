import { Injectable } from '@angular/core';
import {PERMISSION_VIEW} from '@core/models/User';
import {BaseGuard} from './base-guard';
import {AuthService} from '@shared/services/auth.service';
import {Shift} from '@core/models/Shift';

@Injectable({
  providedIn: 'root'
})
export class CanViewShiftsGuard  extends BaseGuard {

  constructor(authService: AuthService) {
    super(authService, PERMISSION_VIEW, Shift.modelType);
  }
}

