import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';
import {FacebookAuthService} from '@app/auth/services/facebook-auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'auth-facebook-login-shell',
  templateUrl: './facebook-login-shell.component.html',
  styleUrls: ['./facebook-login-shell.component.css']
})
export class FacebookLoginShellComponent implements OnInit, AfterContentChecked, OnDestroy {

  @ViewChild('someInput') facebookButton;
  isMobile$: Observable<boolean>;
  initialized = false;

  constructor(private fb: FacebookAuthService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isMobile$ = this.store.select(fromCore.getIsMobileView);
  }

  ngAfterContentChecked() {
    if (!this.initialized && this.facebookButton) {
      this.initialized = true;
      this.initializeButton();
    }
  }

  ngOnDestroy() {
    this.fb.fbEnsureInit(() => {
      FB.Event.unsubscribe('auth.login', () => {});
    });
  }

  initializeButton() {
    this.fb.fbEnsureInit(() => {
      // Ensures that the button doesn't initialized twice (this happens when the login page is the first opened page)
      if (!document.getElementById('facebook')) {
        FB.XFBML.parse();
      }
      FB.Event.subscribe('auth.login', (response) => {
        if (response.status === 'connected') {
          this.store.dispatch(new fromCore.FacebookLogin(response.authResponse.accessToken));
        }
      });
    });
  }
}
