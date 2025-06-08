import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {PermissionModels} from '@api/permissions';
import {Appointment, IAppointment} from '@api/models/Appointment';
import {IUser, User} from './IUser';
import {HistoryType} from '@api/models/HistoryType';

export class AppointmentHistory extends Appointment implements IAppointmentHistory {
  static modelType = PermissionModels.appointment;

  historyType: HistoryType;
  historyDate: Moment;
  historyUser: IUser;

  static fromJS(data?: any): IAppointmentHistory {
    data = typeof data === 'object' ? data : {};
    const result = new AppointmentHistory();
    result.init(data);
    return result;
  }

  init(data: any) {
    super.init(data);
    this.historyType = data.historyType;
    this.historyDate = data.historyDate ? moment.utc(data.historyDate) : null;
    this.historyUser = data.historyUser ? User.fromJs(data.historyUser) : null;
  }
}

export interface IAppointmentHistory extends IAppointment {
  historyType: HistoryType;
  historyDate: Moment;
  historyUser: IUser;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentHistoryAdapter implements Adapter<IAppointmentHistory> {
  adapt(item: any): IAppointmentHistory {
    return AppointmentHistory.fromJS(item);
  }
}
