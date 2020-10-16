import {Injectable} from '@angular/core';

import {CustomerAdminClient} from '@api/clients';

import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {Customer} from '@api/models';
import {MatDialog} from '@angular/material/dialog';
import {CreateCustomerDialogComponent} from '@app/admin-customers/containers/create-customer/create-customer-dialog.component';
import {BaseEffectsWithDialog} from '@shared/state/base/effects';
import * as fromCustomers from '@app/admin-customers/state/index';


@Injectable()
export class CustomersEffects extends BaseEffectsWithDialog<Customer> {

  constructor(actions$: Actions,
              store: Store<fromCustomers.State>,
              dialog: MatDialog,
              private customerAdminClient: CustomerAdminClient,
              ) {
    super(actions$, customerAdminClient, fromCustomers.actions, fromCustomers.selectors, store, dialog, CreateCustomerDialogComponent);
  }
}
