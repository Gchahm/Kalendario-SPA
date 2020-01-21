import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {select} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {User} from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class CanBookAppointments implements CanActivate {

  @select((s: IAppState) => s.core.user) user$: Observable<User>;
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(map(user => {
      return user.isEmployee || user.can.add.appointments();
    }));
  }
}
