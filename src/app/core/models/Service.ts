import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import * as moment from 'moment';
import {Duration} from 'moment';
import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';

export class Service implements IReadModel {
  static modelType = 'service';
  id = 0;
  name = '';
  duration: Duration = moment.duration(0);
  description = '';

  formatDuration() {
    return this.duration.hours() + ':' + this.duration.minutes();
  }

  writeModel() {
    return {
      id: this.id.toString(),
      name: this.name,
      duration: this.duration.toISOString(),
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
  service.duration = moment.duration(item.duration);
  service.description = item.description;
  return service;
}

export interface ServiceWriteModel extends IWriteModel {
  id: string;
  name: string;
  duration: string;
  description: string;
}
