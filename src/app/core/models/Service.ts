import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import * as moment from 'moment';
import {Duration} from 'moment';
import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';
import {TimeOfDay} from './TimeOfDay';

export class Service implements IReadModel {
  static modelType = 'service';
  id = 0;
  name = '';
  duration: TimeOfDay  = TimeOfDay.zero();
  color = '#FFFFFF';
  description = '';

  writeModel(): IServiceWriteModel {
    return {
      id: this.id.toString(),
      name: this.name,
      duration: this.duration.toString(),
      color: this.color,
      description: this.description
    };
  }

  toString() {
    return this.name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ServiceAdapter implements Adapter<Service> {
  adapt(item: any): Service {
    return adaptService(item);
  }
}

export function adaptService(item: any): Service {
  const service = new Service();
  service.id = item.id;
  service.name = item.name;
  service.duration = TimeOfDay.fromString(item.duration);
  service.description = item.description;
  service.color = item.color;
  return service;
}

export interface IServiceWriteModel extends IWriteModel {
  id: string;
  name: string;
  duration: string;
  description: string;
  color: string;
}
