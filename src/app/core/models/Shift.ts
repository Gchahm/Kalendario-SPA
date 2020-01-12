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

export class Shift implements IShiftReadModel {
  id = 0;
  name = '';
  frames = [];

  writeModel(): IShiftWriteModel {
    return {
      id: this.id.toString(),
      name: this.name,
      frames: this.frames.map(f => ({start: f.start.toString(), end: f.end.toString()}))
    };
  }

  toString() {
    return this.name;
  }
}

export interface IShiftReadModel extends IReadModel {
  name: string;
  frames: TimeFrame[];
}

export interface IShiftWriteModel extends IWriteModel {
  name: string;
  frames: {start: string, end: string}[];
}

@Injectable({
  providedIn: 'root'
})
export class ShiftAdapter implements Adapter<Shift> {
  adapt(item: any): Shift {
    if (item === null) {
      return null;
    }
    const shift = new Shift();
    shift.id = item.id;
    shift.name = item.name;
    shift.frames = item.frames.map(f => new TimeFrame(f.start, f.end));
    return shift;
  }
}
