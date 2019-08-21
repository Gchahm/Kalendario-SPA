import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../staff-services/models/LoginModel';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl, user)
      .pipe(
        map((response: any) => {
          if (response) {
            this.setToken(response.token);
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
            this.router.navigate([returnUrl]);
          }
        })
      );
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
