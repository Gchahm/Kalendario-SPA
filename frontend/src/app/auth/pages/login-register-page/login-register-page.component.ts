import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'auth-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  registerMode: boolean;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.registerMode = this.router.url === '/register';
    this.subscription = this.store.pipe(select(fromCore.getIsLoggedIn))
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          const params = {};
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          for (const key of this.route.snapshot.queryParamMap.keys) {
            if (key !== 'returnUrl') {
              params[key] = this.route.snapshot.queryParamMap.get(key);
            }
          }
          this.router.navigate([returnUrl], {queryParams: {...params}});
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
