import {Adapter} from '../interfaces/adapter';
import {Shift, ShiftAdapter} from './Shift';
import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Injectable} from '@angular/core';

export class Schedule implements IScheduleReadModel {
  id: number;
  name: string;
  mon: Shift;
  tue: Shift;
  wed: Shift;
  thu: Shift;
  fri: Shift;
  sat: Shift;
  sun: Shift;

  writeModel(): IWriteModel {
    return undefined;
  }

  toString(): string {
    return this.name;
  }
}

export interface IScheduleReadModel extends IReadModel {
  name: string;
  mon: Shift;
  tue: Shift;
  wed: Shift;
  thu: Shift;
  fri: Shift;
  sat: Shift;
  sun: Shift;
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
export class ScheduleAdapter implements Adapter<IScheduleReadModel> {
  constructor(public sa: ShiftAdapter) {}

  adapt(item: any): IScheduleReadModel {
    const schedule = new Schedule();
    schedule.id = item.id;
    schedule.name = item.name;
    schedule.mon = this.sa.adapt(item.mon);
    schedule.tue = this.sa.adapt(item.tue);
    schedule.wed = this.sa.adapt(item.wed);
    schedule.thu = this.sa.adapt(item.thu);
    schedule.fri = this.sa.adapt(item.fri);
    schedule.sat = this.sa.adapt(item.sat);
    schedule.sun = this.sa.adapt(item.sun);
    return schedule;
  }
}
