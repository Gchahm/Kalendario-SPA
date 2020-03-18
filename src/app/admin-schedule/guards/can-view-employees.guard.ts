import {Injectable} from '@angular/core';
import {BaseGuard} from './base-guard';
import {AuthService} from '../services/auth.service';
import {Employee} from '../../core/models/Employee';
import {PERMISSION_VIEW} from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class CanViewEmployeesGuard extends BaseGuard {

  constructor(authService: AuthService) {
    super(authService, PERMISSION_VIEW, Employee.modelType);
  }
}
