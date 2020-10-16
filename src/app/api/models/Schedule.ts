import {Adapter} from '@api/adapter';
import {Shift} from './Shift';
import {IReadModel} from './IReadModel';
import {Injectable} from '@angular/core';
import {Moment} from 'moment';

export class Schedule implements IReadModel {
  static modelType = 'schedule';
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
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.mon = Shift.fromJs(data.mon);
      this.tue = Shift.fromJs(data.tue);
      this.wed = Shift.fromJs(data.wed);
      this.thu = Shift.fromJs(data.thu);
      this.fri = Shift.fromJs(data.fri);
      this.sat = Shift.fromJs(data.sat);
      this.sun = Shift.fromJs(data.sun);
    }
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
