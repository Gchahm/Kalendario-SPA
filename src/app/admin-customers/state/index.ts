import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromReducer from './customers.reducer';
import * as fromAppointments from '@app/admin-appointments/state';

import {storeName} from './customers.actions';
export {State, reducer} from './customers.reducer';
export {actions, storeName} from './customers.actions';

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

const getCurrentCustomerAppointments = createSelector(
  fromAppointments.selectors.selectAll,
  baseSelectors.getCurrentId,
  (appointments, customerId) => appointments.filter(apt => apt.customer.id === customerId)
);

export const selectors = {
  ...baseSelectors,
  getCurrentCustomerAppointments
}
