import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {Person} from './IPerson';
import {Schedule} from './Schedule';
import {Service} from './Service';

export class EmployeeDashboardModel extends Person {
  static modelType = 'employee';
  id = 0;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  schedule: Schedule;
  instagram: string;
  photoUrl: string;
  bio: string;
  services: Service[] = [];

  static fromJs(data: any): EmployeeDashboardModel {
    data = typeof data === 'object' ? data : {};
    const result = new EmployeeDashboardModel();
    result.id = data.id;
    result.firstName = data.firstName;
    result.lastName = data.lastName;
    result.name = data.name;
    result.email = data.email;
    result.phone = data.phone;
    result.schedule = Schedule.fromJs(data.schedule);
    result.instagram = data.instagram;
    result.photoUrl = data.profileImg ? environment.imageStorage + data.profileImg
      : environment.assetUrl + 'img/default-avatar.jpg';
    result.bio = data.bio;
    result.services = data.services.map(s => Service.fromJs(s));
    return result;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardAdapter implements Adapter<EmployeeDashboardModel> {
  adapt(data: any): EmployeeDashboardModel {
    return EmployeeDashboardModel.fromJs(data);
  }
}
