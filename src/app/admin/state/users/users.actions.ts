import {ActionCreator, createAction, props} from '@ngrx/store';
import {User} from '@api/models';
import {UserPasswordWriteModel} from '@api/clients/UserAdminClient';
import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {TypedAction} from '@ngrx/store/src/models';


export const storeName = 'adminUsers';


interface UsersActions extends BaseEntityActions<User> {
  requestChangeUserPassword: ActionCreator<string, (props: {id: number, command: UserPasswordWriteModel}) => ({id: number, command: UserPasswordWriteModel} & TypedAction<string>)>,
  toggleShowPasswordForm: ActionCreator<string, (props: {value: boolean}) => ({value: boolean} & TypedAction<string>)>,
  changePasswordSuccess: ActionCreator<string, (props: {}) => ({} & TypedAction<string>)>,
}


export const actions: UsersActions = {
  ...createActions<User>(storeName),
  requestChangeUserPassword: createAction(`[${storeName}] Request Change Password`, props<{id: number, command: UserPasswordWriteModel}>()),
  toggleShowPasswordForm: createAction(`[${storeName}] Toggle Show Password`, props<{value: boolean}>()),
  changePasswordSuccess: createAction(`[${storeName}] Change Password Success`, props<{}>()),
};
