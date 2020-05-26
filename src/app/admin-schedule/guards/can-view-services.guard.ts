import {Injectable} from '@angular/core';
import {PERMISSION_VIEW} from '@core/models/User';
import {BaseGuard} from './base-guard';
import {AuthService} from '@shared/services/auth.service';
import {Service} from '@core/models/Service';

@Injectable({
  providedIn: 'root'
})
export class CanViewServicesGuard  extends BaseGuard {

  constructor(authService: AuthService) {
    super(authService, PERMISSION_VIEW, Service.modelType);
  }
}

