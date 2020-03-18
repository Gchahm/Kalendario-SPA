import {Employee} from './Employee';
import {Service, ServiceAdapter} from './Service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {adaptPerson, Person} from './Person';
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
      id: this.id.toString(),
      start: this.start.toISOString(),
      customer: modelId(this.customer),
      employee: modelId(this.employee),
      service: modelId(this.service),
      status: this.status,
      customer_notes: this.customerNotes
    };
  }

}

@Injectable({
  providedIn: 'root'
})
export class AppointmentAdapter implements Adapter<Appointment> {

  constructor(private serviceAdapter: ServiceAdapter) {
  }

  adapt(item: any): Appointment {
    const apt = new Appointment();
    apt.id = item.id;
    apt.customer = adaptPerson(item.customer);
    apt.employee = item.employee;
    apt.service = item.service;
    apt.status = item.status;
    apt.start = moment.utc(item.start);
    apt.end = moment.utc(item.end);
    apt.customerNotes = item.customer_notes;
    return apt;
  }

}

export interface IAppointmentWriteModel extends IWriteModel {
  start: string;
  customer: number;
  employee: number;
  service: number;
  status: string;
  customer_notes: string;
}
