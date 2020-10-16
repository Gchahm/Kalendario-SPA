import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Service} from '@api/models';
import {Store} from '@ngrx/store';

import {State} from '@admin/state/admin.reducer';

import * as fromServices from '@app/admin-services/state';
import * as fromServiceCategories from '@app/admin-services/state/categories';

import {BaseEntityPage} from '@admin/pages/BaseEntityPage';

@Component({
  selector: 'app-services-admin-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageComponent extends BaseEntityPage<Service> implements OnInit {

  categorizedList$: Observable<{[key: string]: Service[]}>;
  viewModel$: Observable<fromServices.ServiceFullModel>;

  constructor(protected store: Store<State>) {
    super(store, fromServices.actions, fromServices.selectors);
  }

  ngOnInit() {
    this.store.dispatch(fromServiceCategories.actions.initializeStore({params: {}}));
    this.categorizedList$ = this.store.select(fromServices.selectors.getServiceCategorized);
    this.viewModel$ = this.store.select(fromServices.selectors.getCurrentServiceFullModel);
  }
}
