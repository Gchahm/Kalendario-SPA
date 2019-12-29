import {IBaseAppointmentRead} from '../../core/models/IBaseAppointmentRead';
import {Employee} from '../../core/models/Employee';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../../core/interfaces/adapter';
import * as moment from 'moment';
import {IBaseAppointmentWrite} from '../../core/models/IBaseAppointmentWrite';

export class SelfAppointment implements ISelfAppointmentReadModel {
  public id: number;
  public employee: Employee;
  public start: Moment;
  public end: Moment;
  public reason: string;

  constructor() {}

  static CreateModel(): ISelfAppointmentWriteModel {
    return {
      id: '',
      employee: '',
      start: '',
      end: '',
      reason: ''
    };
  }

  writeModel(): ISelfAppointmentWriteModel {
    return {
      id: this.id.toString(),
      employee: this.employee.id.toString(),
      start: this.start.toISOString(),
      end: this.end.toISOString(),
      reason: this.reason
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class SelfAppointmentAdapter implements Adapter<SelfAppointment> {

  constructor() {
  }

  adapt(item: any): SelfAppointment {
    const sApt = new SelfAppointment();
    sApt.id = item.id;
    sApt.employee =  item.employee;
    sApt.start = moment.utc(item.start);
    sApt.end =  moment.utc(item.end);
    sApt.reason = item.reason;
    return sApt;
  }
}


export interface ISelfAppointmentReadModel extends IBaseAppointmentRead {
  end: Moment;
  reason: string;
}

export interface ISelfAppointmentWriteModel extends IBaseAppointmentWrite {
  end: string;
  reason: string;
}
