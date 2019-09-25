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

  login(user: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', user).pipe(map(this.log));
  }

  FBLogin() {
    this.fbService.login(this.log);
  }

  logout() {
    return this.http.post<{ detail: string }>(this.baseUrl + 'logout/', {}).pipe(
      map(res => {
        this.removeToken();
        this.router.navigate(['']);
        return res;
      })
    );
  }

  register(form: any) {
    return this.http.post(this.baseUrl + 'registration/', form).pipe(map(this.log));
  }

  private log = (project: any) => {
    this.setToken(project.key);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigate([returnUrl]);
  };

  isLoggedIn() {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

}
