import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';


import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as actions from './core.actions';
import {AuthService} from '@api/clients/auth.service';
import {ToastService} from '@shared/services/toast.service';
import {Router} from '@angular/router';


@Injectable()
export class CoreEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router) {
  }

  @Effect()
  InitializeUser$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.InitializeUser),
    mergeMap(action => this.authService.whoAmI().pipe(
      map(user => (new actions.InitializeUserSuccess(user))),
      )
    )
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.Login),
    map((action: actions.Login) => action.payload),
    mergeMap(loginModel => this.authService.login(loginModel).pipe(
      tap(user => this.toastService.success(`welcome back ${user.firstName}`)),
      map(user => (new actions.LoginSuccess(user))),
      catchError(err => of(new actions.LoginFail(err)))
      )
    )
  );

  @Effect()
  FacebookLogin$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.FacebookLogin),
    map((action: actions.FacebookLogin) => action.payload),
    mergeMap((authToken) => this.authService.facebookLogin(authToken).pipe(
      tap(user => this.toastService.success(`welcome back ${user.firstName}`)),
      map(user => (new actions.LoginSuccess(user))),
      catchError(err => of(new actions.LoginFail(err)))
      )
    )
  );


  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.Register),
    map((action: actions.Register) => action.payload),
    mergeMap(registerModel => this.authService.register(registerModel).pipe(
      tap(user => this.toastService.success(`welcome ${user.firstName}`)),
      map(user => (new actions.RegisterSuccess(user))),
      catchError(err => of(new actions.RegisterFail(err)))
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.Logout),
    mergeMap(action => this.authService.logout().pipe(
      map(() => {
        this.router.navigate(['/']);
        return new actions.LogoutSuccess();
      }),
      )
    )
  );

  @Effect()
  RequestSocialAccounts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.RequestSocialAccounts),
    mergeMap(action => this.authService.socialAccounts().pipe(
      map((accounts) => new actions.RequestSocialAccountsSuccess(accounts)),
      catchError(err => of(new actions.RequestSocialAccountsFail(err)))
      )
    )
  );

  @Effect()
  RequestFacebookConnect$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.RequestFacebookConnect),
    map((action: actions.RequestFacebookConnect) => action.payload),
    mergeMap(payload => this.authService.facebookConnect(payload).pipe(
      map(() => new actions.RequestSocialAccounts()),
      catchError(err => of(new actions.RequestFacebookConnectFail(err)))
      )
    )
  );

  @Effect({dispatch: false})
  RequestResendConfirmEmail$ = this.actions$.pipe(
    ofType(actions.CoreActionsType.RequestResendConfirmEmail),
    mergeMap(() => this.authService.resendConfirmationEmail().pipe(
      tap(s => this.toastService.success('Email Resent')),
      )
    )
  );

  @Effect()
  RequestConfirmEmail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CoreActionsType.RequestConfirmEmail),
    map((action: actions.RequestConfirmEmail) => action.payload),
    mergeMap(payload => this.authService.verifyEmail(payload).pipe(
      tap(s => this.toastService.success('email confirmed')),
      map(() => new actions.RequestConfirmEmailSuccess()),
      catchError(err => {
        this.toastService.error('couldn\'t confirm the email address');
        return of(new actions.RequestConfirmEmailFail());
      })
      )
    )
  );
}
