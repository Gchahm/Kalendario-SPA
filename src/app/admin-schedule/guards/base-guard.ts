import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class BaseGuard implements CanActivate {

  protected constructor(public authService: AuthService,
                        private type: string,
                        private model: string) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.whoAmI()
      .pipe(
        map(user => user.hasPermission(this.type, this.model))
      );
  }
}
