import {Injectable} from '@angular/core';

import {ScheduleAdminClient} from '@api/clients';
import {ISchedule} from '@api/models';

import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

import * as fromSchedules from '@app/admin-schedule/state/index';
import {BaseEffects} from '@shared/state/base/effects';

@Injectable()
export class SchedulesEffects extends BaseEffects<ISchedule> {
  constructor(actions$: Actions,
              store: Store<fromSchedules.State>,
              private shiftAdminClient: ScheduleAdminClient) {
    super(actions$, shiftAdminClient, fromSchedules.actions, fromSchedules.selectors, store);
  }
}
