import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';
import {BaseContainer} from '@app/containers/BaseContainer';

@Component({
  selector: 'app-navbar-shell',
  templateUrl: './navbar-shell.component.html',
  styleUrls: ['./navbar-shell.component.css']
})
export class NavbarShellComponent extends BaseContainer {

  isLoggedIn$: Observable<boolean>;
  showLeftPaneButton$: Observable<boolean>;
  companyName$: Observable<string>;
  cartCount$: Observable<number>;

  constructor(store: Store<fromRoot.State>) {
    super(store);
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
