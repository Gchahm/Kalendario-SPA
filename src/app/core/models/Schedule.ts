import {Adapter} from '../interfaces/adapter';
import {adaptShift, Shift} from './Shift';
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

  writeModel(): IScheduleWriteModel {
    return {
      id: this.id.toString(),
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
  adapt(item: any): Schedule {
    const schedule = new Schedule();
    schedule.id = item.id;
    schedule.name = item.name;
    schedule.mon = adaptShift(item.mon);
    schedule.tue = adaptShift(item.tue);
    schedule.wed = adaptShift(item.wed);
    schedule.thu = adaptShift(item.thu);
    schedule.fri = adaptShift(item.fri);
    schedule.sat = adaptShift(item.sat);
    schedule.sun = adaptShift(item.sun);
    return schedule;
  }
}
