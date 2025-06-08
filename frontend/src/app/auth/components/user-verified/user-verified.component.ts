import {Component, Input} from '@angular/core';
import {IUser} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';

@Component({
  selector: 'auth-user-verified',
  templateUrl: './user-verified.component.html',
  styleUrls: ['./user-verified.component.css']
})
export class UserVerifiedComponent {
  @Input() set user(value: IUser) {
    this.verified = value?.verified;
    this.toolTip = this.verified ? 'Verified' : 'Unverified, click here to verify';
  }

  verified: boolean;
  toolTip: string;

  constructor(private store: Store<fromRoot.State>) {
  }

  resendEmail() {
    this.store.dispatch(new fromCore.RequestResendConfirmEmail());
  }
}
