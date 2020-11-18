import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import * as fromCore from './core.reducer';
import {pipe} from 'rxjs';
import {filter} from 'rxjs/operators';
import {User} from '@api/models';
import {getApp} from '@api/models/User';
import {PERMISSION_ADD, PERMISSION_CHANGE, PERMISSION_DELETE, PERMISSION_VIEW} from '@api/permissions';

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


export interface ModelPermissions {
  view: boolean;
  add: boolean;
  change: boolean;
  delete: boolean;
}

export const hasPermission = createSelector(
  selectCurrentUser,
  (user, {model}) => {
    return {
      view: user.permissions.includes(`${getApp(model)}.${PERMISSION_VIEW}_${model}`),
      add: user.permissions.includes(`${getApp(model)}.${PERMISSION_ADD}_${model}`),
      change: user.permissions.includes(`${getApp(model)}.${PERMISSION_CHANGE}_${model}`),
      delete: user.permissions.includes(`${getApp(model)}.${PERMISSION_DELETE}_${model}`),
    };
  }
);

