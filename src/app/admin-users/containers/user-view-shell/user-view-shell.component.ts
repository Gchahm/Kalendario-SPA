import { Component, OnInit } from '@angular/core';
import {ViewShellComponent} from '@shared/common/ViewShellComponent';
import {Employee, Group, IUser} from '@api/models';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromUsers from '@app/admin-users/state';
import * as fromGroups from '@app/admin/state/groups';
import {UserPasswordWriteModel} from '@api/clients/UserAdminClient';
import * as fromEmployees from '@app/admin-employee/state';
import {UserViewModel} from '@app/admin-users/state';
import {ApiError} from '@api/Errors';

@Component({
  selector: 'admin-user-view-shell',
  templateUrl: './user-view-shell.component.html',
  styleUrls: ['./user-view-shell.component.css']
})
export class UserViewShellComponent extends ViewShellComponent<IUser> implements OnInit {

  model$: Observable<UserViewModel>;
  groups$: Observable<Group[]>;
  employees$: Observable<Employee[]>;
  changePasswordError$: Observable<ApiError>;
  showPasswordForm$: Observable<boolean>;

  constructor(protected store: Store<State>) {
    super(store, fromUsers.actions, fromUsers.selectors);
  }

  ngOnInit(): void {
    this.store.dispatch(fromUsers.actions.initializeStore({params: {}}));
    this.store.dispatch(fromGroups.actions.initializeStore({params: {}}));
    this.store.dispatch(fromEmployees.actions.initializeStore({params: {}}));
    this.bindProperties();
  }
  bindProperties() {
    this.groups$ = this.store.select(fromGroups.selectors.selectAll);
    this.employees$ = this.store.select(fromEmployees.selectors.selectAll);
    this.model$ = this.store.select(fromUsers.selectors.getUserViewModel);
    this.changePasswordError$ = this.store.select(fromUsers.selectors.selectPasswordError);
    this.showPasswordForm$ = this.store.select(fromUsers.selectors.selectShowPasswordForm);
  }

  updatePassword(user: IUser, command: UserPasswordWriteModel) {
    this.store.dispatch(fromUsers.actions.requestChangeUserPassword({id: user.id, command}));
  }

  toggleShowPasswordForm(value: boolean) {
    this.store.dispatch(fromUsers.actions.toggleShowPasswordForm({value}));
  }
}
