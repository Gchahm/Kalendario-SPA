import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../admin-schedule/services/auth.service';
import {UserService} from '../../../shared/services/user.service';
import {Globals} from '../../services/Globals';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService,
              public globals: Globals) {
  }

  async ngOnInit() {
    if (!this.globals.user) {
      this.authService.loadUser().toPromise();
    }
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
