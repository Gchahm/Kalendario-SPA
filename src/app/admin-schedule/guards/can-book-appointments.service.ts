import { Injectable } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Appointment} from '../../core/models/Appointment';
import {BaseGuard} from './base-guard';
import {PERMISSION_ADD} from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class CanBookAppointments extends BaseGuard {

  constructor(authService: AuthService) {
    super(authService, PERMISSION_ADD, Appointment.modelType);
  }
}
