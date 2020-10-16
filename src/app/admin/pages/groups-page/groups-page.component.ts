import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Group, Permission} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

import * as fromGroups from '@admin/state/groups';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsPageComponent extends BaseEntityPage<Group> implements OnInit {

  viewModel$: Observable<fromGroups.GroupViewModel>;
  permissions$: Observable<Permission[]>;

  constructor(protected store: Store<State>) {
    super(store, fromGroups.actions, fromGroups.selectors);
  }

  ngOnInit() {
    this.initializeStore();
    this.bindProperties();
  }

  initializeStore() {
    this.store.dispatch(fromGroups.actions.requestLoadPermissions({}));
  }

  bindProperties() {
    this.permissions$ = this.store.select(fromGroups.selectors.getPermissions);
    this.viewModel$ = this.store.select(fromGroups.selectors.getCurrentGroupViewModel);
  }
}
