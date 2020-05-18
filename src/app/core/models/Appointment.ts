import {Employee} from './Employee';
import {Service} from './Service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import { Person} from './Person';
import {IWriteModel} from './interfaces/IWriteModel';
import {IReadModel, modelId} from './interfaces/IReadModel';

export class Appointment implements IReadModel {
  static modelType = 'appointment';

  public id = 0;
  public customer = new Person();
  public employee = new Employee();
  public service = new Service();
  public status = 'P';
  public start: Moment = moment.utc();
  public end: Moment = moment.utc();
  public customerNotes: string;

  static fromJS(data: any): Appointment {
    data = typeof data === 'object' ? data : {};
    const result = new Appointment();
    result.init(data);
    return result;
  }

  statusDescription() {
    switch (this.status) {
      case 'A':
        return 'accepted';
      case 'R':
        return 'rejected';
      case 'P':
        return 'pending';
      default:
        return 'pending';
    }
  }

  writeModel(): IAppointmentWriteModel {
    return {
      id: this.id,
      start: this.start,
      customer: modelId(this.customer),
      employee: modelId(this.employee),
      service: modelId(this.service),
      status: this.status,
      customer_notes: this.customerNotes
    };
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.customer = Person.fromJS(data.customer);
      this.employee = data.employee;
      this.service = data.service;
      this.status = data.status;
      this.start = moment.utc(data.start);
      this.end = moment.utc(data.end);
      this.customerNotes = data.customer_notes;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentAdapter implements Adapter<Appointment> {
  adapt(item: any): Appointment {
    return Appointment.fromJS(item);
  }
}

export interface IAppointmentWriteModel extends IWriteModel {
  start: Moment;
  customer: number;
  employee: number;
  service: number;
  status: string;
  customer_notes: string;
}
