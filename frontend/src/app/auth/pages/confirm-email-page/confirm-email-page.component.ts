import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';

@Component({
  selector: 'auth-confirm-email-page',
  templateUrl: './confirm-email-page.component.html',
  styleUrls: ['./confirm-email-page.component.scss']
})
export class ConfirmEmailPageComponent implements OnInit {

  confirmed$: Observable<boolean>;
  failure$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute) {
    this.confirmed$ = this.store.select(fromCore.getEmailConfirmed);
    this.failure$ = this.store.select(fromCore.getEmailConfirmationFailure);
  }

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('emailKey');
    if (key) {
      this.confirmEmail(key);
    }
  }

  confirmEmail(key) {
    this.store.dispatch(new fromCore.RequestConfirmEmail(key));
  }

  resendEmail() {
    this.store.dispatch(new fromCore.RequestResendConfirmEmail());
  }
}
