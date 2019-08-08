import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/LoginModel';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl, user)
      .pipe(
        map((response: any) => {
          if (response) {
            this.setToken(response.token);
            this.userService.setCurrentUser(response.user);
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
    localStorage.removeItem('token');
  }
}
