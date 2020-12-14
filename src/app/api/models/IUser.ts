import {Adapter} from '@api/adapter';
import {Injectable} from '@angular/core';
import {IPerson, Person} from './IPerson';
import {Company} from './Company';
import {EmployeeResourceModel, IEmployeeResourceModel} from '@api/models/IEmployeeResourceModel';
import {getApp, PermissionModels} from '@api/permissions';
import {IReadModel} from '@api/models/IReadModel';


export function checkForPermission(user: IUser, permission: string, model: PermissionModels) {
  return user.permissions.includes(`${getApp(model)}.${permission}_${model}`);
}

export class User implements IUser {
  static modelType = PermissionModels.user;

  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  employee: IEmployeeResourceModel;
  employeeId: number;
  person: IPerson;
  groups: number[] = [];
  permissions: string[] = [];
  company: Company;
  verified: boolean;

  static AnonymousUser(): IUser {
    return ANONYMOUS_USER;
  }

  static fromJs(data?: any): User {
    data = typeof data === 'object' ? data : {};
    const result = new User();
    result.init(data);
    return result;
  }

  init(data: any) {
    this.id = data.id;
    this.firstName = data.firstName ? data.firstName : '';
    this.lastName = data.lastName ? data.lastName : '';
    this.name = data.name ? data.name : '';
    this.email = data.email ? data.email : '';
    this.employeeId = data.employeeId ? data.employeeId : '';
    this.employee = data.employee ? EmployeeResourceModel.fromJs(data.employee) : null;
    this.person = data.person ? Person.fromJS(data.person) : null;
    this.groups = data.groups ? data.groups : [];
    this.permissions = data.permissions ? data.permissions : [];
    this.company = data.owner ? Company.fromJs(data.owner) : null;
    this.verified = !!data.verified;
  }
}

export interface IUser extends IReadModel {
  firstName: string;
  lastName: string;
  email: string;
  employee: IEmployeeResourceModel;
  employeeId: number;
  person: IPerson;
  groups: number[];
  permissions: string[];
  company: Company;
  verified: boolean;
}


export interface IUserWriteModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: number;
  groups: number[];
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<IUser> {
  adapt(data: any): IUser {
    return User.fromJs(data);
  }
}


const ANONYMOUS_USER = new User();
