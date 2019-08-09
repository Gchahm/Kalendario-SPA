import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginModel} from '../../../staff-services/models/LoginModel';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ToastService} from '../../../shared/services/toast.service';
import {User} from '../../../staff-services/models/User';
import {UserService} from '../../../shared/services/user.service';

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
              private toastService: ToastService) {
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
      this.toastService.success('logged in');
    }, error1 => {
      this.toastService.error(error1);
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
    this.toastService.message('Logged out');
  }

  toast() {
    this.toastService.message('this is the message');
  }
}
