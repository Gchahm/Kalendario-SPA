import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import * as fromReducer from './groups.reducer';

import {IGroup, Permission} from '@api/models';

import {storeName} from './groups.actions';
export {State, reducer, initialState} from './groups.reducer';
export {actions, storeName} from './groups.actions';

export interface GroupViewModel {
  group: IGroup;
  permissions: Permission[];
}

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

const getPermissions = createSelector(
  getFeature,
  state => state.permissions
);

const getCurrentGroupViewModel: MemoizedSelector<object, GroupViewModel> = createSelector(
  baseSelectors.getCurrent,
  getPermissions,
  (group, permissions) => {
    return {
      group,
      permissions: !!group && permissions ? permissions.filter(p => group.permissions.includes(p.id)) : []
    };
  }
);


export const selectors = {
  ...baseSelectors,
  getCurrentGroupViewModel,
  getPermissions
};


