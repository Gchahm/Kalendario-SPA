import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MediaMatcherService} from '@shared/services/media-matcher.service';

import * as fromRoot from '@app/state';
import {Store} from '@ngrx/store';
import * as coreActions from '@core/state/core.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Kalendario';
  subscription: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private mediaMatcher: MediaMatcherService) {
    this.setMobileViewFlag();
    this.setTabletViewFlag();

    if (!this.mediaMatcher.isMobile) {
      this.mediaMatcher.addMobileQueryListener(this.setMobileViewFlag());
      this.mediaMatcher.addTabletQueryListener(this.setTabletViewFlag());
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new coreActions.InitializeUser());
    // this.subscription = this.authService.whoAmI().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mediaMatcher.removeMobileQueryListener(this.setMobileViewFlag());
    this.mediaMatcher.removeTabletQueryListener(this.setTabletViewFlag());
  }

  setMobileViewFlag() {
    this.store.dispatch(new coreActions.ToggleIsMobile(this.mediaMatcher.isMobile));
  }

  setTabletViewFlag() {
    this.store.dispatch(new coreActions.ToggleIsTablet(this.mediaMatcher.isTablet));
  }

}
