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
              public isCustomer: boolean,
              public permissions: string[]) {
  }

  public static AnonymousUser(): User {
    return AnonymousUser;
  }

  canViewEmployee(): boolean {
    return this.permissions.includes('scheduling.view_employee');
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
      getPerson(item.person),
      item.is_employee,
      item.is_customer,
      item.permissions
    );
  }

}

function getPerson(item: any): Person {
  if (item === null) {
    return null;
  }
  return {id: item.id, firstName: item.first_name, lastName: item.last_name};
}

const AnonymousUser = new User(null, null, null, null, null, false, false, []);
