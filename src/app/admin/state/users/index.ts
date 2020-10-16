import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import * as fromReducer from './users.reducer';
import * as fromGroups from '@admin/state/groups';
import * as fromEmployees from '@app/admin-employee/state';
import {storeName} from './users.actions';
import {Employee, Group, User} from '@api/models';

export {actions, storeName} from './users.actions';
export {reducer, State} from './users.reducer';


export interface UserViewModel {
  user: User;
  employee: Employee;
  groups: Group[];
}


const getFeature = createFeatureSelector<fromReducer.State>(storeName);


const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));


const getShowPasswordForm = createSelector(
  getFeature,
  state => state.showPasswordForm
)


export const getUserViewModel: MemoizedSelector<object, UserViewModel> = createSelector(
  baseSelectors.getCurrent,
  fromGroups.selectors.selectAll,
  fromEmployees.selectors.selectAll,
  (user, groups, emps) => {
    return {
      user,
      groups: !!user && !!groups ? groups.filter(g => user.groups.includes(g.id)) : [],
      employee: user.employee
    };
  }
);


export const selectors = {
  ...baseSelectors,
  getShowPasswordForm,
  getUserViewModel
};
