import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {UserService} from '../../../shared/services/user.service';
import {ToastService} from '../../../shared/services/toast.service';
import {Globals} from '../../../shared/Globals';

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
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }

  logout() {
    this.authService.logout()
      .toPromise()
      .then( res => {
        this.toastService.message(res.detail);
        console.log('navbar user: ' + this.globals.user.firstName);
      });
  }

}
