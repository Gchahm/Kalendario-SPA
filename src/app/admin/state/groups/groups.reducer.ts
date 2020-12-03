import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {IGroup, GroupAdapter, Permission} from '@api/models';
import {actions} from './groups.actions';
import {on} from '@ngrx/store';


export interface State extends BaseEntityState<IGroup> {
  permissions: Permission[];
}


const initialState: State = {
  ...baseInitialState<IGroup>(),
  permissions: []
};


export const adapter = createBaseAdapter<IGroup>(new GroupAdapter());


export const reducer = createBaseReducer<IGroup>(initialState, adapter, actions,
  on(actions.addPermissions, (state, {permissions}) => ({...state, permissions, apiError: null}))
);

