import {Adapter} from '../interfaces/adapter';
import {Shift} from './Shift';
import {IReadModel, modelId} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Injectable} from '@angular/core';
import {Moment} from 'moment';

export class Schedule implements IReadModel {
  static modelType = 'schedule';
  id = 0;
  owner: string;
  name: string;
  mon: Shift;
  tue: Shift;
  wed: Shift;
  thu: Shift;
  fri: Shift;
  sat: Shift;
  sun: Shift;

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

  writeModel(): IScheduleWriteModel {
    return {
      id: this.id,
      name: this.name,
      mon: modelId(this.mon),
      tue: modelId(this.tue),
      wed: modelId(this.wed),
      thu: modelId(this.thu),
      fri: modelId(this.fri),
      sat: modelId(this.sat),
      sun: modelId(this.sun)
    };
  }

  shifts(): string[] {
    return ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  }

  getShift(date: Moment) {
    switch (date.isoWeekday()) {
      case 1:
        return this.mon;
      case 2:
        return this.tue;
      case 3:
        return this.wed;
      case 4:
        return this.thu;
      case 5:
        return this.fri;
      case 6:
        return this.sat;
      case 7:
        return this.sun;
    }
  }

  toString(): string {
    return this.name;
  }
}

export interface IScheduleWriteModel extends IWriteModel {
  name: string;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleAdapter implements Adapter<Schedule> {
  adapt(data: any): Schedule {
    return Schedule.fromJs(data);
  }
}
