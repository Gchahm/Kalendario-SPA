import {createFeatureSelector} from '@ngrx/store';
import * as fromReducer from './schedules.reducer';

import {storeName} from './schedules.actions';
export {State, reducer} from './schedules.reducer';
export {actions, storeName} from './schedules.actions';

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

export const selectors = {
  ...baseSelectors
}
