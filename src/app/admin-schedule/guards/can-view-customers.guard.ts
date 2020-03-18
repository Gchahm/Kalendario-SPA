import { Injectable } from '@angular/core';
import {BaseGuard} from './base-guard';
import {AuthService} from '../services/auth.service';
import {PERMISSION_VIEW} from '../../core/models/User';
import {Customer} from '../../core/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CanViewCustomersGuard extends BaseGuard {

  constructor(authService: AuthService) {
    super(authService, PERMISSION_VIEW, Customer.modelType);
  }
}
