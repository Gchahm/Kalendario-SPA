import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {User, UserAdapter} from '@api/models/User';
import {LoginModel} from '@api/models/LoginModel';

export interface RegisterModel {
  firstName: string,
  lastName: string,
  email: string,
  password1: string,
  password2: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient,
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
    return this.http.post<{ detail: string }>(this.baseUrl + 'logout/', {})
      .pipe(
        map(res => {
          AuthService.removeToken();
          return res;
        })
      );
  }

  login(user: LoginModel): Observable<User> {
    return this.http.post(this.baseUrl + 'login/', user)
      .pipe(
        switchMap((project: any) => {
          AuthService.setToken(project.key);
          return this.whoAmI();
        })
      );
  }

  register(form: RegisterModel): Observable<User> {
    return this.http.post(this.baseUrl + 'registration/', form)
      .pipe(
        switchMap((project: any) => {
          AuthService.setToken(project.key);
          return this.whoAmI();
        }),
      );
  }

  public resendConfirmationEmail() {
    return this.http.post(this.baseUrl + 'resend/', {});
  }

  public whoAmI(): Observable<User> {
    if (AuthService.isLoggedIn()) {
      return this.getUser();
    }
    return of(User.AnonymousUser());
  }

  private getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/')
      .pipe(
        map(this.adapter.adapt),
        catchError(() => {
          AuthService.removeToken();
          return of(User.AnonymousUser());
        })
      );
  }
}
