import {Adapter} from '../adapter';
import {Injectable} from '@angular/core';
import {Person} from './Person';

export class User {
  constructor(public id: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              public person: Person,
              public isEmployee: boolean,
              public isCustomer: boolean) {
  }

  public static AnonymousUser(): User {
    return new User(null, null, null, null, null, false, false);
  }
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
      {id: item.person.id, firstName: item.person.first_name, lastName: item.person.last_name},
      item.is_employee,
      item.is_customer
    );
  }

}
