import {Adapter} from '../interfaces/adapter';
import {Injectable} from '@angular/core';
import {Person} from './Person';
import {Company} from './Company';

export const PERMISSION_VIEW = 'view';
export const PERMISSION_ADD = 'add';

export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public person: Person;
  public isEmployee: boolean;
  public permissions: string[] = [];
  public company: Company;

  public static AnonymousUser(): User {
    return ANONYMOUS_USER;
  }

  static fromJs(data: any): User {
    data = typeof data === 'object' ? data : {};
    const result = new User();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.person = Person.fromJS(data.person);
      this.permissions = data.permissions;
      this.company = Company.fromJs(data.company);
    }
  }

  hasPermission(type, model) {
    return this.permissions.includes(`scheduling.${type}_${model}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {
  adapt(data: any): User {
    return User.fromJs(data);
  }
}


const ANONYMOUS_USER = new User();
