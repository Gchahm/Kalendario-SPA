import {Injectable} from '@angular/core';
import {User, UserAdapter} from '../../core/models/User';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../../admin-schedule/services/auth.service';
import {Globals} from '../../core/services/Globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient,
              private globals: Globals,
              private adapter: UserAdapter) {
  }

  loadUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'current/')
      .pipe(
        map(res => {
          this.globals.user = res;
          return this.adapter.adapt(res);
        }),
        catchError(err => {
          this.globals.user = User.AnonymousUser();
          AuthService.removeToken();
          return of(User.AnonymousUser());
        })
      );
  }
}
