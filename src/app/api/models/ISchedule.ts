import {Adapter} from '@api/adapter';
import {Shift, IShift} from './IShift';
import {IReadModel} from './IReadModel';
import {Injectable} from '@angular/core';
import {Moment} from 'moment';
import {PermissionModels} from '@api/permissions';

export class Schedule implements ISchedule {
  static modelType = PermissionModels.schedule;
  id = 0;
  name: string;
  mon: IShift;
  tue: IShift;
  wed: IShift;
  thu: IShift;
  fri: IShift;
  sat: IShift;
  sun: IShift;
  shifts: string[];

  static fromJs(data?: any): ISchedule {
    data = typeof data === 'object' ? data : {};
    const result = new Schedule();
    result.init(data);
    return result;
  }

  init(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.mon = Shift.fromJs(data.mon);
    this.tue = Shift.fromJs(data.tue);
    this.wed = Shift.fromJs(data.wed);
    this.thu = Shift.fromJs(data.thu);
    this.fri = Shift.fromJs(data.fri);
    this.sat = Shift.fromJs(data.sat);
    this.sun = Shift.fromJs(data.sun);
    this.shifts = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  }
}

export function getShift(schedule: ISchedule, date: Moment) {
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

export interface ISchedule extends IReadModel {
  mon: IShift;
  tue: IShift;
  wed: IShift;
  thu: IShift;
  fri: IShift;
  sat: IShift;
  sun: IShift;
  shifts: string[];
}

export interface IScheduleWriteModel {
  id: number;
  name: string;
  mon: IShift;
  tue: IShift;
  wed: IShift;
  thu: IShift;
  fri: IShift;
  sat: IShift;
  sun: IShift;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleAdapter implements Adapter<ISchedule> {
  adapt(data: any): ISchedule {
    return Schedule.fromJs(data);
  }
}
