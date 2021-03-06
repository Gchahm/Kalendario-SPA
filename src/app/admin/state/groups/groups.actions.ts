import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {IGroup, Permission} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';


export const storeName = 'adminGroups';


interface GroupsActions extends BaseEntityActions<IGroup> {
  requestLoadPermissions: ActionCreator<string, (props: {}) => ({} & TypedAction<string>)>;
  addPermissions: ActionCreator<string, (props: {permissions: Permission[]}) => ({permissions: Permission[]} & TypedAction<string>)>;
}


export const actions: GroupsActions = {
  ...createActions<IGroup>(storeName),
  requestLoadPermissions: createAction(`[${storeName}] Request Permissions`, props<{}>()),
  addPermissions: createAction(`[${storeName}] Add Permissions`, props<{permissions: Permission[]}>()),
};
