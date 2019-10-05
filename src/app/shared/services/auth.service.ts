import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FacebookAuthService} from './facebook-auth.service';
import {LoginModel} from '../models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private fbService: FacebookAuthService) {

  }
  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  static isLoggedIn() {
    return !!AuthService.getToken();
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', user).pipe(map(this.log));
  }

  FBLogin() {
    this.fbService.login(this.log);
  }

  logout() {
    return this.http.post<{ detail: string }>(this.baseUrl + 'logout/', {}).pipe(
      map(res => {
        AuthService.removeToken();
        this.router.navigate(['']);
        return res;
      })
    );
  }

  register(form: any) {
    return this.http.post(this.baseUrl + 'registration/', form).pipe(map(this.log));
  }

  private log = (project) => {
    AuthService.setToken(project.key);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigate([returnUrl]);
  };

}

