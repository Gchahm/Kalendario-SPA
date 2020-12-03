import {createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';
import * as fromReducer from './scheduling.reducer';
import * as fromEmployees from '@app/admin-employee/state';
import * as fromAppointments from '@app/admin-appointments/state';
import * as fromSchedule from '@app/admin-schedule/state';

import {storeName} from './scheduling.actions';
import {IAppointment, Employee} from '@api/models';
import {CalendarEvent} from '@app/admin-scheduling/models/CalendarEvent';
import {Slot} from '@app/admin-scheduling/models/Slot';
import {getShift} from '@api/models/Schedule';

export {State, reducer} from './scheduling.reducer';
export {actions, storeName} from './scheduling.actions';


export interface ToolbarEmployee {
  employee: Employee;
  isSelected: boolean;
}

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));


const getDate = createSelector(
  getFeature,
  state => state.date
);


const getToolBarEmployees: MemoizedSelector<object, ToolbarEmployee[]> = createSelector(
  fromEmployees.selectors.selectAll,
  baseSelectors.getCurrent,
  (employees, panel) => !!employees && !!panel ? employees.map(emp => ({
    employee: emp,
    isSelected: panel.employees.indexOf(emp.id) >= 0
  })) : []
);

const getSelectedEmployees = createSelector(
  getToolBarEmployees,
  employees => employees.filter(emp => emp.isSelected).map(emp => emp.employee)
);

function transformToCalendarEvent(appointment: IAppointment): CalendarEvent {
  if (appointment.service !== null) {
    return {
      id: appointment.id,
      title: !appointment.request ? appointment.customer.firstName + ' - ' + appointment.service.name : 'pending request',
      color: appointment.service.color,
      start: appointment.start,
      end: appointment.end,
    };
  } else {
    return {
      id: appointment.id,
      title: 'locked time',
      color: '#FFFFFF',
      start: appointment.start,
      end: appointment.end,
    };
  }
}


const getEmployeeEvents: MemoizedSelectorWithProps<object, number, CalendarEvent[]> = createSelector(
  fromAppointments.selectors.selectAll,
  getDate,
  (appointments, date, props) =>
    appointments
      .filter(appointment => appointment.employee.id === props &&
        (date.date() === appointment.start.date() ||
          (appointment.start < date && appointment.end > date)))
      .map(transformToCalendarEvent)
);


const getAvailability: MemoizedSelectorWithProps<object, { scheduleId: number }, Slot[]> = createSelector(
  fromSchedule.selectors.selectAll,
  getDate,
  (schedules, date, props) => {
    const schedule = schedules.find(s => s.id === props.scheduleId);
    return !schedule ? [] : !!getShift(schedule, date) ? getShift(schedule, date).frames : [];
  }
);


export const selectors = {
  ...baseSelectors,
  getDate,
  getSelectedEmployees,
  getToolBarEmployees,
  getEmployeeEvents,
  getAvailability
};
