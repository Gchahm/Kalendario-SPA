import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ISocialAccount} from '@api/models';
import {Store} from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as fromCore from '@core/state';

@Component({
  selector: 'auth-social-accounts-shell',
  templateUrl: './social-accounts-shell.component.html',
  styleUrls: ['./social-accounts-shell.component.css']
})
export class SocialAccountsShellComponent implements OnInit {

  socialAccounts$: Observable<ISocialAccount[]>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromCore.RequestSocialAccounts());
    this.socialAccounts$ = this.store.select(fromCore.getSocialAccounts);
  }

}
