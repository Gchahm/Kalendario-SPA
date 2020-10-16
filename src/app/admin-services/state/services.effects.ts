import {Injectable} from '@angular/core';

import {ServiceAdminClient} from '@api/clients';
import {Service} from '@api/models';

import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

import * as fromServices from '@app/admin-services/state/index';
import {BaseEffects} from '@shared/state/base/effects';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class ServicesEffects extends BaseEffects<Service> {
  constructor(actions$: Actions,
              store: Store<fromServices.State>,
              dialog: MatDialog,
              private serviceAdminClient: ServiceAdminClient) {
    super(actions$, serviceAdminClient, fromServices.actions, fromServices.selectors, store);
  }
}
