import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {IPerson, Person} from '@api/models/IPerson';
import {environment} from '../../../environments/environment';
import {PermissionModels} from '@api/permissions';

export class Employee extends Person implements IEmployee {
  private;
  schedule;
  instagram;
  photoUrl;
  bio;
  services: number[];

  static fromJs(data?: any): IEmployee {
    data = typeof data === 'object' ? data : {};
    const result = new Employee();
    result.init(data);
    return result;
  }

  init(data: any) {
    super.init(data);
    this.private = !!data.private;
    this.schedule = data.schedule ? data.schedule : 0;
    this.instagram = data.instagram ? data.instagram : '';
    this.photoUrl = data.profileImg ? environment.imageStorage + data.profileImg
      : environment.assetUrl + 'img/default-avatar.jpg';
    this.bio = data.bio ? data.bio : '';
    this.services = data.services ? data.services : [];
  }
}

export interface IEmployee extends IPerson {
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
  services: number[];

}

@Injectable({
  providedIn: 'root'
})
export class EmployeeAdapter implements Adapter<IEmployee> {
  adapt(data: any): IEmployee {
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
