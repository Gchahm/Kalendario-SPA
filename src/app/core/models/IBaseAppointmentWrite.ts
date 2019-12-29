import {IWriteModel} from './interfaces/IWriteModel';

export interface IBaseAppointmentWrite extends IWriteModel {
  employee: string;
  start: string;
}
