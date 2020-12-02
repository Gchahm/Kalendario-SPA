import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {Person} from '@api/models/Person';
import {environment} from '../../../environments/environment';
import {PermissionModels} from '@api/permissions';

export class Employee extends Person {
  id;
  private;
  firstName;
  lastName;
  name;
  email;
  phone;
  schedule;
  instagram;
  photoUrl;
  bio;
  services: number[] = [];

  static fromJs(data: any): Employee {
    data = typeof data === 'object' ? data : {};
    const result = new Employee();
    if (data) {
      // this.project = _data["project"] ? ProjectBindingModel.fromJS(_data["project"]) : <any>null;
      result.id = data.id ? data.id : 0 ;
      result.private = !!data.private;
      result.firstName = data.firstName ? data.firstName : '';
      result.lastName = data.lastName ? data.lastName : '';
      result.name = data.name ? data.name : '';
      result.email = data.email ? data.email : '';
      result.phone = data.phone ? data.phone : '';
      result.schedule = data.schedule ? data.schedule : 0;
      result.instagram = data.instagram ? data.instagram : '';
      result.photoUrl = data.profileImg ? environment.imageStorage + data.profileImg
        : environment.assetUrl + 'img/default-avatar.jpg';
      result.bio = data.bio ? data.bio : '';
      result.services = data.services ? data.services : [];
    }
    return result;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeAdapter implements Adapter<Employee> {
  adapt(data: any): Employee {
    return Employee.fromJs(data);
  }
}

export interface EmployeeWriteModel {
  id: number;
  private: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schedule: number;
  instagram: string;
  bio: string;
  services: number[];
}
