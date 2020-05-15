import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class BaseGuard implements CanActivate {

  protected constructor(private authService: AuthService,
                        private type: string,
                        private model: string) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.whoAmI().pipe(map(user => {
      return user.hasPermission(this.type, this.model);
    }));
  }
}
