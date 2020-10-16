import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';

@Component({
  selector: 'app-navbar-shell',
  templateUrl: './navbar-shell.component.html',
  styleUrls: ['./navbar-shell.component.css']
})
export class NavbarShellComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  showLeftPaneButton$: Observable<boolean>
  companyName$: Observable<string>;
  user$: Observable<User>;
  cartCount$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(fromCore.getCurrentUser);
    this.showLeftPaneButton$ = this.store.select(fromCore.getShowLeftPaneButton);
    this.isLoggedIn$ = this.store.select(fromCore.getIsLoggedIn);
    this.cartCount$ = this.store.select(fromCore.getRequestCount);
    this.companyName$ = this.store.select(fromCore.getCompanyName);
  }

  logout() {
    this.store.dispatch(new fromCore.Logout());
  }

  toggleLeftPane() {
    this.store.dispatch(new fromCore.ToggleLeftPane());
  }

}
