import {Adapter} from '../interfaces/adapter';
import {adaptShift, Shift, ShiftAdapter} from './Shift';
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

  writeModel(): IScheduleWriteModel {
    return {
      id: this.id.toString(),
      name: this.name,
      mon: this.shiftId(this.mon),
      tue: this.shiftId(this.tue),
      wed: this.shiftId(this.wed),
      thu: this.shiftId(this.thu),
      fri: this.shiftId(this.fri),
      sat: this.shiftId(this.sat),
      sun: this.shiftId(this.sun)
    };
  }

  public shiftId(shift: Shift): number {
    if (shift) {
      return shift.id;
    }
    return null;
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

  shiftId(shift: Shift): number;
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
  adapt(item: any): IScheduleReadModel {
    const schedule = new Schedule();
    schedule.id = item.id;
    schedule.name = item.name;
    schedule.mon = adaptShift(item.mon);
    schedule.wed = adaptShift(item.tue);
    schedule.tue = adaptShift(item.wed);
    schedule.thu = adaptShift(item.thu);
    schedule.fri = adaptShift(item.fri);
    schedule.sat = adaptShift(item.sat);
    schedule.sun = adaptShift(item.sun);
    return schedule;
  }
}
