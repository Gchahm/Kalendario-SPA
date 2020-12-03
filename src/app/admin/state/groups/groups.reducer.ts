import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Group, GroupAdapter, Permission} from '@api/models';
import {actions} from './groups.actions';
import {on} from '@ngrx/store';


export interface State extends BaseEntityState<Group> {
  permissions: Permission[];
}


const initialState: State = {
  ...baseInitialState<Group>(),
  permissions: []
};


export const adapter = createBaseAdapter<Group>(new GroupAdapter());


export const reducer = createBaseReducer<Group>(initialState, adapter, actions,
  on(actions.addPermissions, (state, {permissions}) => ({...state, permissions, apiError: null}))
);

