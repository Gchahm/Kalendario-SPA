import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import * as fromReducer from './users.reducer';
import * as fromGroups from '@admin/state/groups';
import * as fromEmployees from '@app/admin-employee/state';
import {storeName} from './users.actions';
import {IGroup, IUser} from '@api/models';

export {actions, storeName} from './users.actions';
export {reducer, State} from './users.reducer';


export interface UserViewModel extends IUser {
  groupsModel: IGroup[];
}


const getFeature = createFeatureSelector<fromReducer.State>(storeName);


const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));


export const selectPasswordError = createSelector(
  getFeature,
  store => store.changePassError
);


export const selectShowPasswordForm = createSelector(
  getFeature,
  store => store.showPasswordForm
);

export const getUserViewModel: MemoizedSelector<object, UserViewModel> = createSelector(
  baseSelectors.getCurrent,
  fromGroups.selectors.selectAll,
  fromEmployees.selectors.selectAll,
  (user, groups, emps) => {
    if (!user) {
      return null;
    }
    return {
      ...user,
      groupsModel: !!groups ? groups.filter(g => user.groups.includes(g.id)) : [],
    };
  }
);


export const selectors = {
  ...baseSelectors,
  getUserViewModel,
  selectPasswordError,
  selectShowPasswordForm
};
