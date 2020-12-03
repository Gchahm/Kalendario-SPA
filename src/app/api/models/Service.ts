import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {IReadModel} from './IReadModel';
import {TimeOfDay} from './TimeOfDay';


export class Service implements IReadModel {
  static modelType = 'service';
  id = 0;
  private = false;
  category: number;
  name = '';
  duration: TimeOfDay = TimeOfDay.zero();
  color = '#FFFFFF';
  description = '';
  cost = 0;
  isFrom = false;
  price = '';

  static fromJs(data: any): Service {
    data = typeof data === 'object' ? data : {};
    const result = new Service();
    if (data) {
      result.id = data.id;
      result.private = data.private;
      result.name = data.name;
      result.duration = data.duration ? TimeOfDay.fromString(data.duration) : TimeOfDay.zero();
      result.description = data.description;
      result.color = data.color;
      result.cost = data.cost;
      result.isFrom = data.isFrom;
      result.price = data.price;
      result.category = data.category;
    }
    return result;
  }

  static CreateModel(): Service {
    const result = new Service();
    result.id = null;
    result.private = false;
    result.name = '';
    result.duration = TimeOfDay.fromString('00:00');
    result.description = '';
    result.color = '#FFFFFF';
    result.cost = 0;
    result.isFrom = false;
    result.category = null;
    return result;
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

export interface IServiceWriteModel {
  id: number;
  private: boolean;
  category: number;
  name: string;
  duration: string;
  cost: number;
  isFrom: boolean;
  description: string;
  color: string;
}
