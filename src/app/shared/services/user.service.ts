import {Injectable} from '@angular/core';
import {User, UserAdapter} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient,
              private adapter: UserAdapter) {
  }

  currentUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'current/')
      .pipe(
        map(res => {
        return this.adapter.adapt(res);
      }),
        catchError(err => {
          AuthService.removeToken();
          return of(User.AnonymousUser());
        })
      );
  }
}
