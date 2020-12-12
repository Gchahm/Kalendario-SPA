import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromCore from '@core/state';
import * as fromRoot from '@app/state';
import {LoginModel} from '@api/models/LoginModel';
import {RegisterModel} from '@api/clients/auth.service';
import {ApiError} from '@api/Errors';
import {Observable} from 'rxjs';

@Component({
  selector: 'shared-login-register-shell',
  templateUrl: './login-register-shell.component.html',
  styleUrls: ['./login-register-shell.component.css']
})
export class LoginRegisterShellComponent implements OnInit {
  @Input() registerMode = false;
  apiError$: Observable<ApiError>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.apiError$ = this.store.pipe(select(fromCore.getApiError));
  }

  login(model: LoginModel) {
    this.store.dispatch(new fromCore.Login(model));
  }

  register(model: RegisterModel) {
    this.store.dispatch(new fromCore.Register(model));
  }

  toggleShowLogin() {
    this.registerMode = !this.registerMode;
  }
}
