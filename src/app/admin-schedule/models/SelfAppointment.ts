import {BaseAppointment} from '../../shared/models/BaseAppointment';
import {Employee} from '../../shared/models/Employee';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../../shared/adapter';
import * as moment from 'moment';

export class SelfAppointment implements BaseAppointment {
  constructor(
    public id: number,
    public employee: Employee,
    public start: Moment,
    public end: Moment,
    public reason: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class SelfAppointmentAdapter implements Adapter<SelfAppointment> {

  constructor() {
  }

  adapt(item: any): SelfAppointment {
    return new SelfAppointment(
      item.id,
      item.employee,
      moment.utc(item.start),
      moment.utc(item.end),
      item.reason
    );
  }
}
