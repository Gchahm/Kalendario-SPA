import {Component} from '@angular/core';
import {AuthService} from '../../../admin-schedule/services/auth.service';
import {ToastService} from '../../../shared/services/toast.service';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../Store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @select((s: IAppState) => s.core.isLoggedIn) isLoggedIn;
  @select((s: IAppState) => s.core.user) user$;

  constructor(private authService: AuthService,
              private toastService: ToastService) {
  }

  logout() {
    this.authService.logout()
      .toPromise()
      .then( res => this.toastService.message(res.detail));
  }

}
