import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ISchedule} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state/admin.reducer';

import * as fromSchedules from '@app/admin-schedule/state';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulePageComponent extends BaseEntityPage<ISchedule> {
  constructor(protected store: Store<State>) {
    super(store, fromSchedules.actions, fromSchedules.selectors);
  }
}
