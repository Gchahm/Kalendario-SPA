import {Service, ServiceAdapter} from './Service';
import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';

export class Employee {
  constructor(public id: number,
              public name: string,
              public email: string,
              public instagram: string,
              public photoUrl: string,
              public bio: string,
              public services: Service[]) {}
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeAdapter implements Adapter<Employee> {
  adapt(item: any): Employee {
    return new Employee(
      item.id,
      item.name,
      item.email,
      item.instagram,
      'https://res.cloudinary.com/gchahm/' + item.profile_img,
      item.bio,
      item.services
    );
  }
}
