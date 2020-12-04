import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {Service} from '@api/models/Service';
import {Schedule} from '@api/models/Schedule';
import {Employee, IEmployee} from './IEmployee';

export class EmployeeResourceModel extends Employee implements IEmployeeResourceModel {
  scheduleModel: Schedule;
  serviceModels: Service[];

  static fromJs(data: any): IEmployeeResourceModel {
    data = typeof data === 'object' ? data : {};
    const result = new EmployeeResourceModel();
    result.init(data);
    return result;
  }

  init(data: any) {
    super.init(data);
    this.scheduleModel = Schedule.fromJs(data.schedule);
    this.services = data.services.map(s => s.id);
    this.serviceModels = data.services.map(s => Service.fromJs(s));
  }
}

export interface IEmployeeResourceModel extends IEmployee {
  scheduleModel: Schedule;
  serviceModels: Service[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeResourceModelAdapter implements Adapter<IEmployeeResourceModel> {
  adapt(data: any): IEmployeeResourceModel {
    return EmployeeResourceModel.fromJs(data);
  }
}
