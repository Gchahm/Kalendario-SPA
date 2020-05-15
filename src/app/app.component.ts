import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Subscription} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from './Store';
import {SET_IS_MOBILE_VIEW_FLAG, SET_IS_TABLET_VIEW_FLAG} from './core/CoreActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'appointment-manager-SPA';
  subscription: Subscription;
  mobileQuery: MediaQueryList;
  tableQuery: MediaQueryList;

  constructor(private authService: AuthService,
              private redux: NgRedux<IAppState>,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this.mobileQuery.addEventListener('change', () => this.setMobileViewFlag());

    this.tableQuery = media.matchMedia('(max-width: 959px)');
    // this.tableQuery.addEventListener('change', () => this.setTabletViewFlag());

    this.setMobileViewFlag();
    this.setTabletViewFlag();
  }

  ngOnInit(): void {
    this.subscription = this.authService.dispatchUser().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.mobileQuery.removeEventListener('change', () => this.setMobileViewFlag());
    // this.tableQuery.removeEventListener('change', () => this.setTabletViewFlag());
  }

  setMobileViewFlag() {
    this.redux.dispatch({type: SET_IS_MOBILE_VIEW_FLAG, value: this.mobileQuery.matches});
  }

  setTabletViewFlag() {
    this.redux.dispatch({type: SET_IS_TABLET_VIEW_FLAG, value: this.tableQuery.matches});
  }

}
