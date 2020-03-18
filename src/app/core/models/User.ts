import {Adapter} from '../interfaces/adapter';
import {Injectable} from '@angular/core';
import {adaptPerson, Person} from './Person';
import {adaptCompany, Company} from './Company';

export const PERMISSION_VIEW = 'view';
export const PERMISSION_ADD = 'add';

export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public person: Person;
  public isEmployee: boolean;
  public permissions: string[];
  public company: Company;

  public static AnonymousUser(): User {
    return AnonymousUser;
  }

  hasPermission(type, model) {
    return this.permissions.includes(`scheduling.${type}_${model}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  adapt(item: any): User {
    const user = new User();
    user.id = item.id;
    user.firstName = item.first_name;
    user.lastName = item.last_name;
    user.email = item.email;
    user.person = adaptPerson(item.person);
    user.permissions = item.permissions;
    user.company = adaptCompany(item.company);
    return user;
  }
}


const AnonymousUser = new User();
