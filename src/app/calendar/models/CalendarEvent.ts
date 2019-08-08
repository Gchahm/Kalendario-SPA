import {Moment} from 'moment';

export class CalendarEvent {
  constructor(public start: Moment, public end: Moment) {}
}
