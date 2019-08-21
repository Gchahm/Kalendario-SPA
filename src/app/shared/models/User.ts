import {Adapter} from '../adapter';
import {Injectable} from '@angular/core';

export class User {
  constructor(public id: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              public isEmployee: boolean) {}
}


@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  adapt(item: any): User {
    return new User(
      item.id,
      item.first_name,
      item.last_name,
      item.email,
      item.is_employee
    );
  }

}
