import {Component} from '@angular/core';
import {Schedule} from '../../../../core/models/Schedule';
import {BaseDetailsComponent} from '../BaseDetailsComponent';

@Component({
  selector: 'admin-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent extends BaseDetailsComponent<Schedule> {
  constructor() {
    super();
  }
}
