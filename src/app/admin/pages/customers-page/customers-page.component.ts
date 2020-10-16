import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Customer} from '@api/models/Customer';
import {Store} from '@ngrx/store';

import {State} from '@admin/state';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';
import * as fromCustomers from '@app/admin-customers/state';

@Component({
  selector: 'admin-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersPageComponent extends BaseEntityPage<Customer> {

  constructor(protected store: Store<State>) {
    super(store, fromCustomers.actions, fromCustomers.selectors);
  }

  searchModel(value: string) {
    this.store.dispatch(fromCustomers.actions.requestEntities({params: {search: value}}));
    this.store.dispatch(fromCustomers.actions.setSearch({value}));
  }
}
