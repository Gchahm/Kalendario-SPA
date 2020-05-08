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

  static fromJs(data: any): Service {
    data = typeof data === 'object' ? data : {};
    const result = new Service();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.duration = TimeOfDay.fromString(data.duration);
      this.description = data.description;
      this.color = data.color;
    }
  }

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
  adapt(data: any): Service {
    return Service.fromJs(data);
  }
}

export interface IServiceWriteModel extends IWriteModel {
  name: string;
  duration: string;
  description: string;
  color: string;
}
