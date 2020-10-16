import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {IReadModel} from './IReadModel';

export class ServiceCategory implements IReadModel {
  static modelType = 'serviceCategory';
  id = 0;
  name = '';
  color = '#FFFFFF';

  static fromJs(data: any): ServiceCategory {
    data = typeof data === 'object' ? data : {};
    const result = new ServiceCategory();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.color = data.color;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryAdapter implements Adapter<ServiceCategory> {
  adapt(data: any): ServiceCategory {
    return ServiceCategory.fromJs(data);
  }
}

export interface IServiceCategoryWriteModel {
  id: number;
  name: string;
  color: string;
}
