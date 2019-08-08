import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginModel} from '../../models/LoginModel';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {AlertifyService} from '../../services/alertify.service';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: LoginModel = new LoginModel(  );
  loginSubscription: Subscription;

  constructor(private authService: AuthService,
              private userService: UserService,
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
    return this.userService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.alertify.message('Logged out');
  }
}
