import {TimeOfDay} from '@core/models/TimeOfDay';

export interface Slot {
  start: TimeOfDay;
  end: TimeOfDay;
}
