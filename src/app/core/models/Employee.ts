import {adaptService, Service} from './Service';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';

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

  writeModel() {
    return {
      id: this.id.toString(),
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone: this.phone,
      schedule: this.schedule.toString(),
      instagram: this.instagram,
      photoUrl: this.photoUrl,
      bio: this.bio,
      services: this.services.map(s => s.id.toString())
    };
  }

  toString() {
    return this.name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeAdapter implements Adapter<Employee> {
  adapt(item: any): Employee {
    const emp = new Employee();
    emp.id = item.id;
    emp.firstName = item.first_name;
    emp.lastName = item.last_name;
    emp.name = item.name;
    emp.email = item.email;
    emp.phone = item.phone;
    emp.schedule = item.schedule;
    emp.instagram = item.instagram;
    emp.photoUrl = item.profile_img ? 'https://res.cloudinary.com/gchahm/' + item.profile_img : null;
    emp.bio = item.bio;
    emp.services = item.services.map(adaptService);
    return emp;
  }
}

export interface EmployeeWriteModel extends IWriteModel {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  schedule: string;
  instagram: string;
  photoUrl: string;
  bio: string;
  services: string[];
}
