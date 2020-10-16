import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromConfigs from './company.reducer';

export const storeName  = 'adminCompany';
export {State, reducer} from './company.reducer';
export * from './companyActions';


export const getConfigFeature = createFeatureSelector<fromConfigs.State>(storeName);


export const getCompanyEditMode = createSelector(
  getConfigFeature,
  state => state.companyEditMode
);


export const getConfigEditMode = createSelector(
  getConfigFeature,
  state => state.configEditMode
);

export const getApiError = createSelector(
  getConfigFeature,
  state => state.apiError
);

export const getCompany = createSelector(
  getConfigFeature,
  state => state.company
);

export const getCompanyStripeDetails = createSelector(
  getConfigFeature,
  state => state.companyStripeDetails
);

export const getConfig = createSelector(
  getCompany,
  company => !company ? null : company.config
);
