import * as moment from 'moment';
import {Moment} from 'moment';

export class AgendaEvent {
  start: Moment;
  end: Moment;

  constructor(start, end) {
    this.start = moment.utc(start);
    this.end = moment.utc(end);
    //
    // start.setUTCHours(start.getHours());
    // const naiveTime = start.toISOString().substr(0, 16);
  }
}
