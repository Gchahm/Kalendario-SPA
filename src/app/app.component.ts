import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './admin-schedule/services/auth.service';
import {Subscription} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from './Store';
import {SET_IS_MOBILE_VIEW_FLAG, TOGGLE_LEFT_PANE_BUTTON_VISIBILITY} from './core/CoreActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'appointment-manager-SPA';
  subscription: Subscription;
  mobileQuery: MediaQueryList;
  private _reduxListener: () => void;

  constructor(private authService: AuthService,
              private redux: NgRedux<IAppState>,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._reduxListener = () => this.setMobileViewFlag();
    this.mobileQuery.addEventListener('change', this._reduxListener);
    this.setMobileViewFlag();
  }

  ngOnInit(): void {
    this.subscription = this.authService.dispatchUser().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mobileQuery.removeEventListener('change', this._reduxListener);
  }

  setMobileViewFlag() {
    this.redux.dispatch({type: SET_IS_MOBILE_VIEW_FLAG, value: this.mobileQuery.matches});
  }

}
