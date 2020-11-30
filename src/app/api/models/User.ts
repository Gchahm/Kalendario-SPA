import {Adapter} from '@api/adapter';
import {Injectable} from '@angular/core';
import {Person} from './Person';
import {Company} from './Company';
import {IReadModel} from '@api/models/IReadModel';
import {EmployeeResourceModel} from '@api/models/EmployeeResourceModel';
import {getApp, PermissionModels} from '@api/permissions';


export function checkForPermission(user: User, permission: string, model: PermissionModels) {
  return user.permissions.includes(`${getApp(model)}.${permission}_${model}`);
}

export class User implements IReadModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public name: string;
  public email: string;
  public employee: EmployeeResourceModel;
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
    result.employee = data.employee ? EmployeeResourceModel.fromJs(data.employee) : null;
    result.person = Person.fromJS(data.person);
    result.groups = data.groups;
    result.permissions = data.permissions ? data.permissions : [];
    result.company = Company.fromJs(data.owner);
    return result;
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
