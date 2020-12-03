import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {IUser, UserAdapter} from '@api/models';
import {actions} from '@app/admin-users/state/users.actions';
import {on} from '@ngrx/store';
import {ApiError} from '@api/Errors';


export interface State extends BaseEntityState<IUser> {
  showPasswordForm: boolean;
  changePassError: ApiError;
}


const initialState: State = {
  ...baseInitialState<IUser>(),
  showPasswordForm: false,
  changePassError: null
};


export const adapter = createBaseAdapter<IUser>(new UserAdapter());


export const reducer = createBaseReducer<IUser>(initialState, adapter, actions,
  on(actions.toggleShowPasswordForm, (state, {value}) => ({...state, showPasswordForm: value})),
  on(actions.changePasswordSuccess, (state) => ({...state, changePassError: null, showPasswordForm: false})),
  on(actions.changePasswordError, (state, {changePassError}) => ({...state, changePassError})),
);

