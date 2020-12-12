import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';
import {Observable} from 'rxjs';
import StatusResponse = facebook.StatusResponse;

@Component({
  selector: 'auth-facebook-login-shell',
  templateUrl: './facebook-login-shell.component.html',
  styleUrls: ['./facebook-login-shell.component.css']
})
export class FacebookLoginShellComponent implements OnInit {

  isMobile$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isMobile$ = this.store.select(fromCore.getIsMobileView);
  }

  login(accessToken: string) {
      this.store.dispatch(new fromCore.FacebookLogin(accessToken));
  }
}
