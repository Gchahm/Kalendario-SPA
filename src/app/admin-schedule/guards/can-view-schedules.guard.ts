import {Injectable} from '@angular/core';
import {BaseGuard} from './base-guard';
import {AuthService} from '../../shared/services/auth.service';
import {PERMISSION_VIEW} from '../../core/models/User';
import {Schedule} from '../../core/models/Schedule';

@Injectable({
  providedIn: 'root'
})
export class CanViewSchedulesGuard  extends BaseGuard {

  constructor(authService: AuthService) {
    super(authService, PERMISSION_VIEW, Schedule.modelType);
  }
}
