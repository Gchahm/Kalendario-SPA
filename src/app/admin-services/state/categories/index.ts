import {createFeatureSelector} from '@ngrx/store';
import * as fromReducer from './serviceCategories.reducer';

import {storeName} from './serviceCategories.actions';
export {State, reducer} from './serviceCategories.reducer';
export {actions, storeName} from './serviceCategories.actions';


const getFeature = createFeatureSelector<fromReducer.State>(storeName);


const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

export const selectors = {
  ...baseSelectors
};
