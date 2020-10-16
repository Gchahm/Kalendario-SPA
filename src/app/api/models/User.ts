import {Adapter} from '@api/adapter';
import {Injectable} from '@angular/core';
import {Person} from './Person';
import {Company} from './Company';
import {IReadModel} from '@api/models/IReadModel';
import {Employee} from '@api/models/Employee';


export enum PermissionModels {
  employee= 'employee',
  group = 'groupprofile',
  user = 'user',
  config = 'config',
  service = 'service',
  shift = 'shift',
  schedule = 'schedule',
  customer = 'customer',
  appointment = 'appointment'
}

export function getApp(permission: PermissionModels): string {
  switch (permission) {
    case PermissionModels.group:
      return 'core';
    case PermissionModels.user:
      return 'core';
    default:
      return 'scheduling';
  }
}

export class User implements IReadModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public name: string;
  public email: string;
  public employee: Employee;
  public person: Person;
  public groups: number[] = [];
  public permissions: string[] = [];
  public company: Company;

  public static AnonymousUser(): User {
    return ANONYMOUS_USER;
  }

  static fromJs(data: any): User {
    data = typeof data === 'object' ? data : {};
    const result = new User();
    result.id = data.id;
    result.firstName = data.firstName;
    result.lastName = data.lastName;
    result.name = data.name;
    result.email = data.email;
    result.employee = Employee.fromJs(data.employee);
    result.person = Person.fromJS(data.person);
    result.groups = data.groups;
    result.permissions = data.permissions ? data.permissions : [];
    result.company = Company.fromJs(data.owner);
    return result;
  }

  /*Deprecated: */
  hasPermission(type, model) {
    return this.permissions.includes(`${getApp(model)}.${type}_${model}`);
  }

}

export interface IUserWriteModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  employee: number;
  groups: number[];
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
