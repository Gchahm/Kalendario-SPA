import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, switchMap, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FacebookAuthService} from '../../shared/services/facebook-auth.service';
import {LoginModel} from '../../core/models/LoginModel';
import {User, UserAdapter} from '../../core/models/User';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../Store';
import {LOGIN_USER, LOGOUT_USER} from '../../core/CoreActions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';
  private userUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private adapter: UserAdapter,
              private fbService: FacebookAuthService,
              private redux: NgRedux<IAppState>) {

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

  logout() {
    return this.http.post<{ detail: string }>(this.baseUrl + 'logout/', {}).pipe(
      map(res => {
        AuthService.removeToken();
        this.redux.dispatch({type: LOGOUT_USER, user: User.AnonymousUser()});
        this.router.navigate(['']);
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
    return this.http.post(this.baseUrl + 'login/', user).pipe(
      switchMap((project: any) => {
        AuthService.setToken(project.key);
        return this.whoAmI();
      })
    );
  }

  register(form: any) {
    return this.http.post(this.baseUrl + 'registration/', form).pipe(
      switchMap((project: any) => {
        AuthService.setToken(project.key);
        return this.whoAmI();
      }),
      map(
        user => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          this.router.navigate([returnUrl]);
          return user;
        }
      )
    );
  }
  public loadUser() {
    this.whoAmI().subscribe(user => {
      this.redux.dispatch({type: LOGIN_USER, user});
    });
  }

  private whoAmI(): Observable<User> {
    return this.http.get<User>(this.userUrl + 'current/').pipe(
      map(this.adapter.adapt),
      catchError(() => {
        return of(User.AnonymousUser());
      })
    );
  }

}

