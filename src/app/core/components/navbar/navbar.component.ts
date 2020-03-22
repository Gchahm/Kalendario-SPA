import {Component} from '@angular/core';
import {AuthService} from '../../../admin-schedule/services/auth.service';
import {ToastService} from '../../../shared/services/toast.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {TOGGLE_LEFT_PANE} from '../../CoreActions';
import {PERMISSION_ADD, PERMISSION_VIEW, User} from '../../models/User';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Company} from '../../models/Company';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @select((s: IAppState) => s.core.isLoggedIn) isLoggedIn$;
  @select((s: IAppState) => s.core.showLeftPane) showLeftPane$;
  @select((s: IAppState) => s.company.companyName) companyName$;
  @select((s: IAppState) => s.core.user) user$: Observable<User>;

  constructor(private authService: AuthService,
              private toastService: ToastService,
              private redux: NgRedux<IAppState>) {
  }

  logout() {
    this.authService.logout()
      .toPromise()
      .then( res => this.toastService.message(res.detail));
  }

  toggleLeftPane() {
    this.redux.dispatch({type: TOGGLE_LEFT_PANE});
  }

  canCreateCompany(): Observable<boolean> {
    return this.user$.pipe(
        map(u =>  u.hasPermission(PERMISSION_ADD, Company.modelType))
      );
  }

  canManageCompany(): Observable<boolean> {
    return this.user$.pipe(
      map(u => u.hasPermission(PERMISSION_VIEW, Company.modelType))
    );
  }

}
