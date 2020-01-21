import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {select} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {User} from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class CanViewServicesGuard implements CanActivate {

  @select((s: IAppState) => s.core.user) user$: Observable<User>;
  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(map(user => user.can.view.services()));
  }
}
