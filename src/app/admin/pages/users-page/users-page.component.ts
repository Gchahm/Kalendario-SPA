import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee, Group, User} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromUsers from '@admin/state/users';
import {UserViewModel} from '@admin/state/users';
import {UserPasswordWriteModel} from '@api/clients/UserAdminClient';
import * as fromGroups from '@admin/state/groups';
import * as fromEmployees from '@app/admin-employee/state';
import {BaseEntityPage} from '@admin/pages/BaseEntityPage';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent  extends BaseEntityPage<User> implements OnInit {

  groups$: Observable<Group[]>;
  employees$: Observable<Employee[]>;
  showPasswordForm$: Observable<boolean>;
  userViewModel$: Observable<UserViewModel>;

  constructor(protected store: Store<State>) {
    super(store, fromUsers.actions, fromUsers.selectors);
  }

  ngOnInit() {
    this.initializeStore();
    this.bindProperties();
  }

  initializeStore() {
    this.store.dispatch(fromGroups.actions.initializeStore({params: {}}));
    this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));
  }

  bindProperties() {
    this.groups$ = this.store.select(fromGroups.selectors.selectAll);
    this.employees$ = this.store.select(fromEmployees.selectors.selectAll);
    this.showPasswordForm$ = this.store.select(fromUsers.selectors.getShowPasswordForm);
    this.userViewModel$ = this.store.select(fromUsers.selectors.getUserViewModel);
  }

  updatePassword(user: User, command: UserPasswordWriteModel) {
    this.store.dispatch(fromUsers.actions.requestChangeUserPassword({id: user.id, command}));
  }

  toggleShowPassword(value: boolean) {
    this.store.dispatch(fromUsers.actions.toggleShowPasswordForm({value}));
  }

}
