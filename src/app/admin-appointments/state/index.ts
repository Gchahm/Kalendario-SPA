import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromReducer from './appointments.reducer';

import {storeName} from './appointments.actions';
import {Appointment} from '@api/models';
import {selectCurrentUser} from '@core/state';
import {appointmentPermissions} from '@api/permissions';

export {State, reducer, AppointmentType} from './appointments.reducer';
export {actions, storeName} from './appointments.actions';


const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));


const getInitializedAppointmentType = createSelector(
  getFeature,
  state => state.initialize !== null ? state.initialize.type : null
);


const getInitializedAppointment = createSelector(
  getFeature,
    state => {
      const appointment = new Appointment();
      if (!state.initialize) {
        return appointment;
      }
      appointment.employee = state.initialize.employee;
      if (state.initialize.type === fromReducer.AppointmentType.self) {
        appointment.customer = state.initialize.employee;
      }
      appointment.start = state.initialize.date.clone();
      appointment.end = state.initialize.date.clone();
      appointment.status = 'A';
      return appointment;
    }
);


const getCurrentAppointmentHistory = createSelector(
  getFeature,
  state => state.currentAppointmentHistory
);


const selectCurrentDate = createSelector(
  getFeature,
  state => state.currentDate
);


const selectCurrentDateAppointments = createSelector(
  baseSelectors.selectAll,
  selectCurrentDate,
  (appointments, date) => {
    return appointments.filter(a => a.start.clone().startOf('day').toISOString() === date);
  }
);


const selectCurrentDateEmployeeAppointments = createSelector(
  selectCurrentDateAppointments,
  (appointments, {employeeId}) => {
    return appointments.filter(a => a.employee.id === employeeId);
  }
);


const selectAppointmentPermissions = createSelector(
  selectCurrentUser,
  (user) => appointmentPermissions(user)
);

export const selectors = {
  ...baseSelectors,
  getInitializedAppointment,
  getInitializedAppointmentType,
  getCurrentAppointmentHistory,
  selectCurrentDate,
  selectCurrentDateAppointments,
  selectCurrentDateEmployeeAppointments,
  selectAppointmentPermissions
};


