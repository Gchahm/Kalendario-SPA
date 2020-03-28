import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {TimeOfDay} from './TimeOfDay';

export class TimeFrame {
  start: TimeOfDay;
  end: TimeOfDay;

  constructor(start: string, end: string) {
    this.start = TimeOfDay.fromString(start);
    this.end = TimeOfDay.fromString(end);
  }

  toString() {
    return this.start.toString() + ' - ' + this.end.toString();
  }
}

export class Shift implements IReadModel {
  static modelType = 'shift';
  id: number = null;
  name = '';
  frames: TimeFrame[] = [];

  writeModel(): IShiftWriteModel {
    return {
      id: this.id,
      name: this.name,
      frames: this.frames.map(f => ({start: f.start.toString(), end: f.end.toString()}))
    };
  }

  details(): {name: string, value: string}[] {
    return [
      {name: 'name', value: this.name},
      {name: 'times', value: this.frames.map(s => s.toString()).toString()},
    ];
  }

  toString() {
    return this.name;
  }
}

export interface IShiftWriteModel extends IWriteModel {
  name: string;
  frames: { start: string, end: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ShiftAdapter implements Adapter<Shift> {
  adapt(item: any): Shift {
    return adaptShift(item);
  }
}

export function adaptShift(item: any): Shift {
  const shift = new Shift();
  if (item === null) {
    return shift;
  }
  shift.id = item.id;
  shift.name = item.name;
  shift.frames = item.frames.map(f => new TimeFrame(f.start, f.end));
  return shift;
}
