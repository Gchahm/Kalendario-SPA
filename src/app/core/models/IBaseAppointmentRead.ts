import {IReadModel} from './interfaces/IReadModel';
import {Employee, EmployeeReadModel} from './Employee';
import {Moment} from 'moment';

export interface IBaseAppointmentRead extends IReadModel {
  employee: EmployeeReadModel;
  start: Moment;
  end: Moment;
}
