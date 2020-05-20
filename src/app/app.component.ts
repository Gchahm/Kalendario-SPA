import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Subscription} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from './Store';
import {SET_IS_MOBILE_VIEW_FLAG, SET_IS_TABLET_VIEW_FLAG} from './core/CoreActions';
import {MediaMatcherService} from './shared/services/media-matcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'appointment-manager-SPA';
  subscription: Subscription;

  constructor(private authService: AuthService,
              private redux: NgRedux<IAppState>,
              private mediaMatcher: MediaMatcherService) {
    this.setMobileViewFlag();
    this.setTabletViewFlag();

    if (!this.mediaMatcher.isMobile) {
      this.mediaMatcher.addMobileQueryListener(this.setMobileViewFlag());
      this.mediaMatcher.addTabletQueryListener(this.setTabletViewFlag());
    }
  }

  ngOnInit(): void {
    this.subscription = this.authService.whoAmI().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mediaMatcher.removeMobileQueryListener(this.setMobileViewFlag());
    this.mediaMatcher.removeTabletQueryListener(this.setTabletViewFlag());
  }

  setMobileViewFlag() {
    this.redux.dispatch({type: SET_IS_MOBILE_VIEW_FLAG, value: this.mediaMatcher.isMobile});
  }

  setTabletViewFlag() {
    this.redux.dispatch({type: SET_IS_TABLET_VIEW_FLAG, value: this.mediaMatcher.isTablet});
  }

}
