import {Component} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import {Schedule} from '@api/models';

@Component({
  selector: 'admin-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent extends BaseDetailsComponent<Schedule> {
  constructor() {
    super();
  }

  shifts() {
    return this.model.shifts.map(s => ({name: s.toUpperCase(), value: !!this.model[s] ? this.model[s].name : ''}));
  }
}
