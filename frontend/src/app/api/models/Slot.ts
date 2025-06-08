import * as moment from 'moment';
import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';

export class Slot {
  constructor(public start: Moment, public end: Moment) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class SlotAdapter implements Adapter<Slot> {
  adapt(item: any): Slot {
    return new Slot(
      moment.utc(item.start),
      moment.utc(item.end)
    );
  }

}
