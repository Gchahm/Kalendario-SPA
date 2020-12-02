import {Employee} from './Employee';
import {Service} from './Service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {Person} from './Person';
import {IReadModel} from './IReadModel';
import {User} from '@api/models/User';
import {PermissionModels} from '@api/permissions';

export class Appointment implements IReadModel {
  static modelType = PermissionModels.appointment;

  public id = 0;
  public request: number;
  public name = '';
  public companyName = '';
  public customer = new Person();
  public employee = new Employee();
  public service = new Service();
  public lockEmployee: boolean;
  public status = 'P';
  public start: Moment = moment.utc();
  public end: Moment = moment.utc();
  public customerNotes = '';
  public internalNotes = '';
  public historyDate: Moment;
  public historyUser: User;
  deleted: Moment | null;

  static fromJS(data: any): Appointment {
    data = typeof data === 'object' ? data : {};
    const result = new Appointment();
    result.id = data.id;
    result.request = data.request;
    result.companyName = data.owner.name;
    result.customer = Person.fromJS(data.customer);
    result.employee = Employee.fromJs(data.employee);
    result.lockEmployee = data.lockEmployee;
    result.service = Service.fromJs(data.service);
    result.status = data.status;
    result.start = moment.utc(data.start);
    result.end = moment.utc(data.end);
    result.customerNotes = data.customerNotes;
    result.internalNotes = data.internalNotes;
    result.deleted = data.deleted ? moment.utc(data.deleted) : null;
    if (!!data.historyDate) { result.historyDate = moment.utc(data.historyDate); }
    if (!!data.historyUser) { result.historyUser = User.fromJs(data.historyUser); }
    return result;
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

export interface IAppointmentWriteModel {
  id: number;
  start: Moment;
  end: Moment;
  customer: number;
  employee: number;
  service: number;
  status: string;
  customerNotes: string;
  internalNotes: string;
  ignoreAvailability: boolean;
}
