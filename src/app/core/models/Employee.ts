import {Service} from './Service';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Person} from './Person';
import {Company} from './Company';

export class Employee implements IReadModel {
  static modelType = 'employee';
  id = 0;
  firstName = '';
  lastName = '';
  name = '';
  email = '';
  phone = '';
  schedule = 0;
  instagram = '';
  photoUrl = '';
  bio = '';
  services: Service[] = [];

  static fromJs(data: any): Employee {
    data = typeof data === 'object' ? data : {};
    const result = new Employee();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.schedule = data.schedule;
      this.instagram = data.instagram;
      this.photoUrl = data.profile_img ? 'https://res.cloudinary.com/gchahm/' + data.profile_img : null;
      this.bio = data.bio;
      this.services = data.services.map(Service.fromJs);
    }
  }


  writeModel(): EmployeeWriteModel {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      schedule: this.schedule.toString(),
      instagram: this.instagram,
      // photoUrl: this.photoUrl,
      bio: this.bio,
      services: this.services.map(s => s.id)
    };
  }

  details(): {name: string, value: string}[] {
    return [
      {name: 'name', value: this.name},
      {name: 'email', value: this.email},
      {name: 'phone', value: this.phone},
      {name: 'instagram', value: this.instagram}
    ];
  }

  toString() {
    return this.name;
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

export interface EmployeeWriteModel extends IWriteModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schedule: string;
  instagram: string;
  // photoUrl: string;
  bio: string;
  services: number[];
}
