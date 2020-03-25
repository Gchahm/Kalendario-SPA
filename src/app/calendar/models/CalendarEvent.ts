import {Moment} from 'moment';

export interface CalendarEvent {
  title: string;
  color: string;
  start: Moment;
  end: Moment;
  onClick: () => void;
}
