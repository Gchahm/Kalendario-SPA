import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {IUser, User, UserAdapter} from '../../api/models/IUser';
import {LoginModel} from '@api/models/LoginModel';
import {FacebookAuthService} from '@shared/services/facebook-auth.service';

export interface RegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';
  private facebookUrl = environment.apiUrl + 'social/facebook/';

  constructor(private http: HttpClient,
              private facebookAuth: FacebookAuthService,
              private adapter: UserAdapter) {
  }

  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static isLoggedIn() {
    return !!AuthService.getToken();
  }

  verifyEmail(key: string) {
    return this.http.post(this.baseUrl + 'registration/verify-email/', {key});
  }

  logout() {
    return this.http.post<{ detail: string }>(this.baseUrl + 'logout/', {}).pipe(
      tap(() => AuthService.removeToken()),
      tap(() => this.facebookAuth.logout()),
    );
  }

  login(user: LoginModel): Observable<IUser> {
    return this.http.post<{ key: string }>(this.baseUrl + 'login/', user).pipe(
      tap(({key}) => AuthService.setToken(key)),
      switchMap(() => this.whoAmI())
    );
  }

  facebookLogin(authToken): Observable<IUser> {
    return this.authenticateFacebook(authToken);
  }

  register(form: RegisterModel): Observable<IUser> {
    return this.http.post<{ key: string }>(this.baseUrl + 'registration/', form).pipe(
      tap(({key}) => AuthService.setToken(key)),
      switchMap(() => this.whoAmI())
    );
  }

  public resendConfirmationEmail() {
    return this.http.post(this.baseUrl + 'resend/', {});
  }

  public whoAmI(): Observable<IUser> {
    this.facebookAuth.init();
    if (AuthService.isLoggedIn()) {
      return this.getUser();
    }
    return this.facebookAuth.getToken().pipe(
      switchMap(authToken => this.authenticateFacebook(authToken)),
      catchError(err => of(User.AnonymousUser()))
    );
  }

  private getUser(): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + 'user/')
      .pipe(
        map(this.adapter.adapt),
        catchError(() => {
          AuthService.removeToken();
          return of(User.AnonymousUser());
        })
      );
  }

  private authenticateFacebook(authToken: string): Observable<IUser> {
    return this.http.post<{ key: string }>(this.facebookUrl, {access_token: authToken}).pipe(
      tap(({key}) => AuthService.setToken(key)),
      switchMap(({key}) => this.whoAmI())
    );
  }
}
