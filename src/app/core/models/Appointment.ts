import {Employee} from './Employee';
import {Customer} from './Customer';
import {Service, ServiceAdapter} from './Service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {IBaseAppointmentRead} from './IBaseAppointmentRead';
import {IBaseAppointmentWrite} from './IBaseAppointmentWrite';

export class Appointment implements IAppointmentReadModel {
  public id: number;
  public customer: Customer;
  public employee: Employee;
  public service: Service;
  public status: string;
  public start: Moment;
  public end: Moment;
  public customerNotes: string;

  static CreateModel(): IAppointmentWriteModel {
    return {
      id: '',
      customer: '',
      employee: '',
      service: '',
      status: '',
      start: '',
      customer_notes: ''
    };
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
      id: this.id.toString(),
      customer: this.customer.id.toString(),
      employee: this.employee.id.toString(),
      service: this.service.id.toString(),
      status: this.status,
      start: this.start.toISOString(),
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
    apt.customer = item.customer;
    apt.employee = item.employee;
    apt.service = item.service;
    apt.status = item.status;
    apt.start = moment.utc(item.start);
    apt.end = moment.utc(item.end);
    apt.customerNotes = item.customer_notes;
    return apt;
  }

}

export interface IAppointmentReadModel extends IBaseAppointmentRead {
  customer: Customer;
  service: Service;
  status: string;
  customerNotes: string;
}

export interface IAppointmentWriteModel extends IBaseAppointmentWrite {
  id: string;
  customer: string;
  service: string;
  status: string;
  customer_notes: string;
}
