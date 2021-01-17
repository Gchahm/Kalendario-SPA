import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';
import {checkForPermission} from '@api/models/IUser';
import {PermissionModels} from '@api/permissions';

export abstract class BaseGuard implements CanActivate {

  protected constructor(private store: Store<fromRoot.State>,
                        private type: string,
                        private model: PermissionModels) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      fromCore.getCurrentUser,
      map(user => checkForPermission(user, this.type, this.model))
    );
  }
}
