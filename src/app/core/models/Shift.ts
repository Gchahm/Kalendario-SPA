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
  static modelType = 'service';
  id: number = null;
  name = '';
  frames: TimeFrame[] = [];


  static fromJs(data: any): Shift {
    data = typeof data === 'object' ? data : {};
    const result = new Shift();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
    this.id = data.id;
    this.name = data.name;
    this.frames = data.frames.map(f => new TimeFrame(f.start, f.end));
    }
  }

  writeModel(): IShiftWriteModel {
    return {
      id: this.id,
      name: this.name,
      frames: this.frames.map(f => ({start: f.start.toString(), end: f.end.toString()}))
    };
  }

  details(): { name: string, value: string }[] {
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
  adapt(data: any): Shift {
    return data === null ? null : Shift.fromJs(data);
  }
}
