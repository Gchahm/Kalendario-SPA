import {createFeatureSelector, createSelector, MemoizedSelectorWithProps, select} from '@ngrx/store';
import * as fromCore from './core.reducer';
import {pipe} from 'rxjs';
import {filter} from 'rxjs/operators';
import {IUser, User} from '@api/models';
import {ModelPermissions, PermissionModels} from '@api/permissions';
import {userPermissions} from '@api/permissions/helpers';

export * from './core.reducer';
export * from './core.actions';

const getCoreFeature = createFeatureSelector<fromCore.CoreState>('core');

export const getShowLeftPaneButton = createSelector(
  getCoreFeature,
  state => state.showLeftPaneButton
);

export const getIsLeftPaneOpen = createSelector(
  getCoreFeature,
  state => state.isLeftPanelOpen
);


export const getApiError = createSelector(
  getCoreFeature,
  state => state.apiError
);

export const selectCurrentUser = createSelector(
  getCoreFeature,
  state => state.user
);


export const selectCurrentUserEmployee = createSelector(
  selectCurrentUser,
  user => user.employee
);


export const selectCurrentUserEmployeeServices = createSelector(
  selectCurrentUserEmployee,
  employee => employee.serviceModels
);


export const getIsLoggedIn = createSelector(
  selectCurrentUser,
  user => !!user && user !== User.AnonymousUser()
);

export const getCurrentUser = pipe(
  select(selectCurrentUser),
  filter(val => val !== null)
);

export const getUserCompanyName = createSelector(
  selectCurrentUser,
  user => user.company ? user.company.name : null
);


export const getIsMobileView = createSelector(
  getCoreFeature,
  state => state.isMobile
);

export const getIsTabletView = createSelector(
  getCoreFeature,
  state => state.isTablet
);


export const getRequestCount = createSelector(
  getCoreFeature,
  state => state.requestCount
);


export const getCompanyName = createSelector(
  getCoreFeature,
  state => state.companyName
);


export const hasPermission: MemoizedSelectorWithProps<object, { readonly model?: PermissionModels }, ModelPermissions> = createSelector(
  selectCurrentUser,
  (user, {model}) => userPermissions(user, model)
);

