import {Component} from '@angular/core';
import {AuthService} from '../../../admin-schedule/services/auth.service';
import {ToastService} from '../../../shared/services/toast.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {TOGGLE_LEFT_PANE} from '../../CoreActions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @select((s: IAppState) => s.core.isLoggedIn) isLoggedIn$;
  @select((s: IAppState) => s.core.showLeftPane) showLeftPane$;
  @select((s: IAppState) => s.company.companyName) companyName$;
  @select((s: IAppState) => s.core.user) user$;

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

}
