import {IReadModel} from './interfaces/IReadModel';
import {Employee} from './Employee';
import {Moment} from 'moment';

export interface IBaseAppointmentRead extends IReadModel {
  employee: Employee;
  start: Moment;
  end: Moment;
}
