import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelViewSetClient} from '@api/clients/ModelViewSetClient';
import {User, UserAdapter} from '@api/models';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAdminClient extends ModelViewSetClient<User, object> {
  constructor(http: HttpClient,
              adapter: UserAdapter) {
    super(http, adapter, environment.apiUrl + 'core/users/');
  }

  changePassword(id, model: UserPasswordWriteModel): Observable<User> {
    return this.http.patch<User>(this.baseUrl + id + '/changePassword/', model).pipe(map(this.adapter.adapt));
  }
}

export interface UserPasswordWriteModel {
  userPassword: string;
  password1: string;
  password2: string;
}
