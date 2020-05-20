import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, switchMap, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {FacebookAuthService} from './facebook-auth.service';
import {LoginModel} from '../../core/models/LoginModel';
import {User, UserAdapter} from '../../core/models/User';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {LOGIN_USER, LOGOUT_USER} from '../../core/CoreActions';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient,
              private adapter: UserAdapter,
              private fbService: FacebookAuthService,
              private redux: NgRedux<IAppState>,
              private toastService: ToastService) {

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
          this.redux.dispatch({type: LOGOUT_USER, user: User.AnonymousUser()});
          return res;
        })
      );
  }

  FBLogin() {
    this.fbService.login(
      switchMap((project: any) => {
        AuthService.setToken(project.key);
        return this.whoAmI();
      })
    );
  }

  login(user: LoginModel): Observable<User> {
    return this.http.post(this.baseUrl + 'login/', user)
      .pipe(
        switchMap((project: any) => {
          this.toastService.success('logged in');
          AuthService.setToken(project.key);
          return this.whoAmI();
        }),
        catchError(error => {
          if (error['detail'] && error['detail']['nonFieldErrors']) {
            this.toastService.error(error['detail']['nonFieldErrors']);
          }
          return throwError(error);
        })
      );
  }

  register(form: any): Observable<User> {
    return this.http.post(this.baseUrl + 'registration/', form)
      .pipe(
        switchMap((project: any) => {
          AuthService.setToken(project.key);
          return this.whoAmI();
        })
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
    return this.http.get<User>(this.baseUrl + 'current/').pipe(
      map(this.adapter.adapt),
      map(user => {
        this.redux.dispatch({type: LOGIN_USER, user});
        return user;
      }),
      catchError(() => {
        AuthService.removeToken();
        return of(User.AnonymousUser());
      })
    );
  }
}
