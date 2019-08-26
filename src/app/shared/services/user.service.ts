import {Injectable} from '@angular/core';
import {User, UserAdapter} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
      .pipe(map(res => {
        return this.adapter.adapt(res);
      }));
  }
}
