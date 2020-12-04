import {Component} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {ISchedule, IShift} from '@api/models';

@Component({
  selector: 'admin-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent extends BaseDetailsComponent<ISchedule> {

  hours: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
    '23:00'];

  constructor() {
    super();
  }

  shifts(): IShift[] {
    return this.model.shifts.map(s => this.model[s]);
  }
}
