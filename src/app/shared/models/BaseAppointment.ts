import {Employee} from './Employee';
import {Moment} from 'moment';

export interface BaseAppointment {
  id: number;
  employee: Employee;
  start: Moment;
  end: Moment;
}
