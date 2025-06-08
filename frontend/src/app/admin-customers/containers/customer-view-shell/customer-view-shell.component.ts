import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import * as fromCustomers from '@app/admin-customers/state';
import {ViewShellComponent} from '@shared/common/ViewShellComponent';
import {ICustomer} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

@Component({
  selector: 'admin-customer-view-shell',
  templateUrl: './customer-view-shell.component.html',
  styleUrls: ['./customer-view-shell.component.css']
})
export class CustomerViewShellComponent extends ViewShellComponent<ICustomer> implements OnInit {

  model$: Observable<ICustomer>;

  constructor(protected store: Store<State>) {
    super(store, fromCustomers.actions, fromCustomers.selectors);
  }

  ngOnInit(): void {
    this.store.dispatch(fromCustomers.actions.initializeStore({params: {}}));
    this.model$ = this.store.select(fromCustomers.selectors.getCurrent);
  }

}
