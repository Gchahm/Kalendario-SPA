import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import * as moment from 'moment';
import {Duration} from 'moment';

export class Service {
  constructor(
    public id: number,
    public name: number,
    public duration: Duration
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ServiceAdapter implements Adapter<Service> {
  adapt(item: any): Service {
    return new Service(
      item.id,
      item.name,
      moment.duration(item.duration)
    );
  }

}
