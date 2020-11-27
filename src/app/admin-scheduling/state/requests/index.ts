import {createFeatureSelector} from '@ngrx/store';
import * as fromReducer from './requests.reducer';
import {storeName} from './requests.actions';
export {State, reducer} from './requests.reducer';
export {actions, storeName} from './requests.actions';

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

export const selectors = {
  ...baseSelectors
};
