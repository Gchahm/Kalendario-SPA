import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {User} from '@api/models';
import {actions} from '@admin/state/users/users.actions';
import {on} from '@ngrx/store';


export interface State extends BaseEntityState<User> {
  showPasswordForm: false
}


const initialState: State = {
  ...baseInitialState<User>(),
  showPasswordForm: false
};


export const adapter = createBaseAdapter<User>(User);


export const reducer = createBaseReducer<User>(initialState, adapter, actions,
  on(actions.changePasswordSuccess, (state) => ({...state, apiError: null, showPasswordForm: false})),
  on(actions.toggleShowPasswordForm, (state, {value}) => ({...state, showPasswordForm: value})),
);

