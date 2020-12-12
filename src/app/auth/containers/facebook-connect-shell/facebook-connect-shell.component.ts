import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromCore from '@core/state';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';

@Component({
  selector: 'auth-facebook-connect-shell',
  templateUrl: './facebook-connect-shell.component.html',
  styleUrls: ['./facebook-connect-shell.component.css']
})
export class FacebookConnectShellComponent implements OnInit {

  @ViewChild('someInput') facebookButton;
  isMobile$: Observable<boolean>;
  initialized = false;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isMobile$ = this.store.select(fromCore.getIsMobileView);
  }

  connect(authToken: string) {
    this.store.dispatch(new fromCore.RequestFacebookConnect(authToken));
  }
}
