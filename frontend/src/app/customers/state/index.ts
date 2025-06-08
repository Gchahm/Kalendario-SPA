import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCustomers from './customers.reducer';
import {storeName, adapter} from './customers.reducer';
export * from './customers.reducer';
export * from './customers.actions';

const getCustomersFeature = createFeatureSelector<fromCustomers.CustomersState>(storeName);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getCustomersFeature);

export const getApiError = createSelector(
  getCustomersFeature,
  state => state.apiError
);


export const getRequests = selectAll;


export const getFilter = createSelector(
  getCustomersFeature,
  state => state
);


export const getSelectedRequestId = createSelector(
  getCustomersFeature,
  state => state.selectedRequestId
);


export const getSelectedRequest = createSelector(
  getRequests,
  getSelectedRequestId,
  (requests, id) => requests.find(r => r.id === id)
);


