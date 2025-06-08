import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsEmployeeGuard implements CanActivate {

  protected constructor(private store: Store<fromRoot.State>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      fromCore.getCurrentUser,
      map(user => !!user.employee)
    );
  }
}
