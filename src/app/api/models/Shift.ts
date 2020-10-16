import {IReadModel} from './IReadModel';
import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {TimeOfDay} from './TimeOfDay';

export class TimeFrame {
  start: TimeOfDay;
  end: TimeOfDay;
  name: string;

  constructor(start: string, end: string) {
    this.start = TimeOfDay.fromString(start);
    this.end = TimeOfDay.fromString(end);
    this.name = this.start.toString() + ' - ' + this.end.toString();
  }
}

export class Shift  {
  static modelType = 'shift';
  frames: TimeFrame[] = [];
  name: string;

  static fromJs(data: any): Shift {
    if (data === null) {
      return null;
    }
    data = typeof data === 'object' ? data : {};
    const result = new Shift();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.frames = data.frames.map(f => new TimeFrame(f.start, f.end));
      this.name = this.frames.length > 0 ? this.frames.map(f => f.name).reduce(((p, c) => p + c)) : '';
    }
  }
}

export interface IShiftWriteModel {
  id: number;
  name: string;
  frames: { start: string, end: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ShiftAdapter implements Adapter<Shift> {
  adapt(data: any): Shift {
    return data === null ? null : Shift.fromJs(data);
  }
}
