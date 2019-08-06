import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginModel} from '../../models/LoginModel';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {AlertifyService} from '../../services/alertify.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: LoginModel = new LoginModel(  );
  loginSubscription: Subscription;

  constructor(private authService: AuthService,
              private alertify: AlertifyService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login() {
    this.loginSubscription = this.authService.login(this.user).subscribe(next => {
      this.alertify.success('logged in');
    }, error1 => {
      this.alertify.error(error1);
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  currentUser(): User {
    return this.authService.current_user();
  }

  logout() {
    this.authService.logout();
    this.alertify.message('Logged out');
  }
}
