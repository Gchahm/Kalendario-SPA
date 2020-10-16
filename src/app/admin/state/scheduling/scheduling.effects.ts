import {Injectable} from '@angular/core';

import {SchedulingPanelAdminClient} from '@api/clients';
import {SchedulingPanel} from '@api/models';

import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

import * as fromScheduling from '@admin/state/scheduling/index';
import {BaseEffects} from '@shared/state/base/effects';

@Injectable()
export class SchedulingEffects extends BaseEffects<SchedulingPanel> {
  constructor(actions$: Actions,
              store: Store<fromScheduling.State>,
              private panelAdminClient: SchedulingPanelAdminClient) {
    super(actions$, panelAdminClient, fromScheduling.actions, fromScheduling.selectors, store);
  }
}
