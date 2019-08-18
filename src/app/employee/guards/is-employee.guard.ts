import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {ToastService} from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class IsEmployeeGuard implements CanActivate {

  constructor(private userService: UserService,
              private toastr: ToastService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.getCurrentUser().is_employee) {
      this.toastr.error('Restricted to employees only');
      return false;
    }
    return true;
  }
}
