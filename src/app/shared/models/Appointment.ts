import {Employee} from './Employee';
import {Customer} from './Customer';
import {Service, ServiceAdapter} from './Service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {BaseAppointment} from './BaseAppointment';

export class Appointment implements BaseAppointment {
  constructor(
    public id: number,
    public customer: Customer,
    public employee: Employee,
    public service: Service,
    public status: string,
    public start: Moment,
    public end: Moment,
    public customerNotes: string,
  ) {
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

    updateModel(): UpdateAppointmentModel {
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
    return new Appointment(
      item.id,
      item.customer,
      item.employee,
      this.serviceAdapter.adapt(item.service),
      item.status,
      moment.utc(item.start),
      moment.utc(item.end),
      item.customer_notes
    );
  }

}

export interface CreateAppointmentModel {
  employee: number;
  customer: number;
  service: number;
  start: string;
  status: string;
  customer_notes: string;
}

export interface UpdateAppointmentModel {
  id: string;
  employee: string;
  customer: string;
  service: string;
  start: string;
  status: string;
  customer_notes: string;
}
