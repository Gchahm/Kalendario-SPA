import {Adapter} from '../interfaces/adapter';
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

  can = new PermissionChain(this);

  public static AnonymousUser(): User {
    return AnonymousUser;
  }
}

class PermissionChain {
  view: PermissionChecker;
  add: PermissionChecker;
  change: PermissionChecker;
  delete: PermissionChecker;

  constructor(user: User) {
    this.view = new PermissionChecker(user, 'view');
    this.add = new PermissionChecker(user, 'add');
    this.change = new PermissionChecker(user, 'change');
    this.delete = new PermissionChecker(user, 'delete');
  }
}

class PermissionChecker {
  constructor(private user: User, private type) {
  }

  employees = () => this.hasPermission(this.type, 'employee');
  services = () => this.hasPermission(this.type, 'service');
  appointments = () => this.hasPermission(this.type, 'appointment');
  shifts = () => this.hasPermission(this.type, 'shift');
  schedules = () => this.hasPermission(this.type, 'schedule');

  private hasPermission(type, model): boolean {
    return this.user.permissions.includes(`scheduling.${type}_${model}`);
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
