import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';


export class Shift implements IShiftReadModel {
  id = 0;
  name = '';

  writeModel() {
    return {
      id: this.id.toString(),
      name: this.name,
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShiftAdapter implements Adapter<Shift> {
  adapt(item: any): Shift {
    const shift = new Shift();
    shift.id = item.id;
    shift.name = item.name;
    return shift;
  }
}

export interface IShiftReadModel extends IReadModel {
  name: string;
}

export interface IShiftWriteModel extends IWriteModel {
  name: string;
}
