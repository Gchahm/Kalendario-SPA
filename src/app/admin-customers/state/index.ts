import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromReducer from './customers.reducer';
import * as fromAppointments from '@app/admin-appointments/state';

import {storeName} from './customers.actions';
import {Customer} from '@api/models';

export {State, reducer} from './customers.reducer';
export {actions, storeName} from './customers.actions';

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

function customerFilter(m: Customer, s: string) {
  const sLower = s.toLowerCase();
  return m.name.toLowerCase().includes(sLower) ||
    m.phone.toLowerCase().includes(sLower) ||
    m.email.toLowerCase().includes(sLower);
}

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature, customerFilter);

const getCurrentCustomerAppointments = createSelector(
  fromAppointments.selectors.selectAll,
  baseSelectors.getCurrentId,
  (appointments, customerId) => appointments.filter(apt => apt.customer.id === customerId)
);

export const selectors = {
  ...baseSelectors,
  getCurrentCustomerAppointments
};
