import {Adapter} from '@api/adapter';
import {Shift} from './Shift';
import {IReadModel} from './IReadModel';
import {Injectable} from '@angular/core';
import {Moment} from 'moment';
import {PermissionModels} from '@api/models/User';

export class Schedule implements IReadModel {
  static modelType = PermissionModels.schedule;
  id = 0;
  name: string;
  mon: Shift;
  tue: Shift;
  wed: Shift;
  thu: Shift;
  fri: Shift;
  sat: Shift;
  sun: Shift;
  shifts = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  static fromJs(data: any): Schedule {
    data = typeof data === 'object' ? data : {};
    const result = new Schedule();
    if (data) {
      result.id = data.id;
      result.name = data.name;
      result.mon = Shift.fromJs(data.mon);
      result.tue = Shift.fromJs(data.tue);
      result.wed = Shift.fromJs(data.wed);
      result.thu = Shift.fromJs(data.thu);
      result.fri = Shift.fromJs(data.fri);
      result.sat = Shift.fromJs(data.sat);
      result.sun = Shift.fromJs(data.sun);
    }
    return result;
  }
}

export function getShift(schedule: Schedule, date: Moment) {
  switch (date.isoWeekday()) {
    case 1:
      return schedule.mon;
    case 2:
      return schedule.tue;
    case 3:
      return schedule.wed;
    case 4:
      return schedule.thu;
    case 5:
      return schedule.fri;
    case 6:
      return schedule.sat;
    case 7:
      return schedule.sun;
  }
}

export interface IScheduleWriteModel {
  id: number;
  name: string;
  mon: Shift;
  tue: Shift;
  wed: Shift;
  thu: Shift;
  fri: Shift;
  sat: Shift;
  sun: Shift;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleAdapter implements Adapter<Schedule> {
  adapt(data: any): Schedule {
    return Schedule.fromJs(data);
  }
}
