import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/LoginModel';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) {
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl, user)
      .pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('current_user', JSON.stringify(response.user));
          }
        })
      );
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
  }

  current_user(): User {
    const user = localStorage.getItem('current_user');
    return JSON.parse(user) as User;
  }
}
