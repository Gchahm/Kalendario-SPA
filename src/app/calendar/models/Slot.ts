import { TimeOfDay } from '@api/models/TimeOfDay';

export interface Slot {
  start: TimeOfDay;
  end: TimeOfDay;
}
