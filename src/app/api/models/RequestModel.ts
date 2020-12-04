import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {IReadModel} from './IReadModel';
import {Appointment, IAppointment} from './Appointment';
import {Moment} from 'moment';
import {IEmployee} from './IEmployee';
import {Company} from '@api/models/Company';
import {IPerson, Person} from '@api/models/IPerson';

export interface RequestItem {
  employee: IEmployee;
  appointments: IAppointment[];
}

export class RequestModel implements IReadModel {
  static modelType = 'appointment';

  id = 0;
  owner: Company;
  name = '';
  scheduledDate: string;
  items: RequestItem[] = [];
  itemsCount: number;
  total: number;
  fee: number;
  complete: boolean;
  status: string;
  person: IPerson;

  static fromJS(data: any): RequestModel {
    data = typeof data === 'object' ? data : {};
    const result = new RequestModel();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.owner = Company.fromJs(data.owner);
      this.complete = data.complete;
      this.scheduledDate = data.scheduledDate;
      this.total = data.total;
      this.fee = data.fee;
      this.itemsCount = 0;
      this.person = Person.fromJS(data.person);
      this.status = data.status;
      this.name = this.person.name;
      const items = {};
      for (const apt of data.appointments.map(a => Appointment.fromJS(a))) {
        this.itemsCount += 1;
        if (items.hasOwnProperty(apt.employee.id)) {
          items[apt.employee.id].appointments.push(apt);
        } else {
          items[apt.employee.id] = {
            employee: apt.employee,
            appointments: [apt]
          };
        }
      }
      this.items = Object.keys(items).map(k => items[k]);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RequestAdapter implements Adapter<RequestModel> {
  adapt(item: any): RequestModel {
    return RequestModel.fromJS(item);
  }
}

export interface AddAppointmentWriteModel {
  start: Moment;
  employee?: number;
  service: number;
}
