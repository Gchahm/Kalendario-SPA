import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {Person} from '@api/models/Person';
import {environment} from '../../../environments/environment';

export class Employee extends Person {
  static modelType = 'employee';
  id = 0;
  private = false;
  firstName = '';
  lastName = '';
  name = '';
  email = '';
  phone = '';
  schedule = 0;
  instagram = '';
  photoUrl = '';
  bio = '';
  services: number[] = [];

  static fromJs(data: any): Employee {
    data = typeof data === 'object' ? data : {};
    const result = new Employee();
    if (data) {
      result.id = data.id;
      result.private = data.private;
      result.firstName = data.firstName;
      result.lastName = data.lastName;
      result.name = data.name;
      result.email = data.email;
      result.phone = data.phone;
      result.schedule = data.schedule;
      result.instagram = data.instagram;
      result.photoUrl = data.profileImg ? environment.imageStorage + data.profileImg
        : environment.assetUrl + 'img/default-avatar.jpg';
      result.bio = data.bio;
      result.services = data.services;
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
