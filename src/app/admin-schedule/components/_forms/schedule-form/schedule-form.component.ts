import {Component, OnInit} from '@angular/core';
import {Schedule} from '@core/models/Schedule';
import {BaseFormComponent} from '../BaseFormComponent';
import {IAppState} from '@app/Store';
import {select} from '@angular-redux/store';
import {ScheduleService} from '../../../services/schedule.service';

@Component({
  selector: 'admin-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent extends BaseFormComponent<Schedule> implements OnInit {
  @select((s: IAppState) => s.admin.shifts) shifts$;
  @select((s: IAppState) => s.core.isTabletView) isTablet$;

  constructor(service: ScheduleService) {
    super(service);
  }
}
