import {Employee} from './Employee';
import {Customer} from './Customer';
import {Service, ServiceAdapter} from './Service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';

export class Appointment {
  constructor(
    public id: number,
    public customer: Customer,
    public employee: Employee,
    public service: Service,
    public status: string,
    public start: Moment,
    public end: Moment
  ) {}

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
      moment.utc(item.end)
    );
  }

}
