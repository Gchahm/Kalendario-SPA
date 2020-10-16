import {Moment} from 'moment';

export interface CalendarEvent {
  id: number;
  title: string;
  color: string;
  start: Moment;
  end: Moment;
}
