import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {environment} from '../../../environments/environment';
import {Service} from '@api/models/Service';
import {Schedule} from '@api/models/Schedule';
import {Employee} from '@api/models/Employee';

export class EmployeeResourceModel extends Employee {
  id = 0;
  name: string;
  email: string;
  phone: string;
  scheduleModel: Schedule;
  instagram: string;
  photoUrl: string;
  bio: string;
  serviceModels: Service[] = [];

  static fromJs(data: any): EmployeeResourceModel {
    data = typeof data === 'object' ? data : {};
    const result = new EmployeeResourceModel();
    if (data) {
      result.id = data.id;
      result.name = data.name;
      result.email = data.email;
      result.phone = data.phone;
      result.scheduleModel = Schedule.fromJs(data.schedule);
      result.instagram = data.instagram;
      result.photoUrl = data.profileImg ? environment.imageStorage + data.profileImg
        : environment.assetUrl + 'img/default-avatar.jpg';
      result.bio = data.bio;
      result.services = data.services.map(s => s.id);
      result.serviceModels = data.services.map(s => Service.fromJs(s));
    }
    return result;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeResourceModelAdapter implements Adapter<EmployeeResourceModel> {
  adapt(data: any): EmployeeResourceModel {
    return EmployeeResourceModel.fromJs(data);
  }
}
