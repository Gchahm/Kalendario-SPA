import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
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
      id: this.id,
      name: this.name,
      duration: this.duration.toString(),
      color: this.color,
      description: this.description
    };
  }

  details(): {name: string, value: string}[] {
    return [
      {name: 'name', value: this.name},
      {name: 'duration', value: this.duration.toString()},
      {name: 'color', value: this.color},
      {name: 'description', value: this.description}
    ];
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
  name: string;
  duration: string;
  description: string;
  color: string;
}
