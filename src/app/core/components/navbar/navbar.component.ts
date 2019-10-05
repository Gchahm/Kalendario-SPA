import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../shared/models/User';
import {UserService} from '../../../shared/services/user.service';
import {ToastService} from '../../../shared/services/toast.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.user$ = this.userService.currentUser();
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }

  logout() {
    this.authService.logout()
      .toPromise()
      .then( res => this.toastService.message(res.detail));
  }

}
