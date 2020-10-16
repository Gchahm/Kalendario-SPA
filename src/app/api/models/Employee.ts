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
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.private = data.private;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.schedule = data.schedule;
      this.instagram = data.instagram;
      this.photoUrl = data.profileImg ? environment.imageStorage + data.profileImg
        : environment.assetUrl + 'img/default-avatar.jpg';
      this.bio = data.bio;
      this.services = data.services;
    }
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
