import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../staff-services/models/User';
import {UserService} from '../../../shared/services/user.service';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  ngOnInit() {
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

}
