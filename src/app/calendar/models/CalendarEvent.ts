import {Moment} from 'moment';

export interface CalendarEvent {
  title: string;
  start: Moment;
  end: Moment;
  onClick: () => void;
}
