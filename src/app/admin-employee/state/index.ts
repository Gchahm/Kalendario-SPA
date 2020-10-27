import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Employee, Schedule, Service} from '@api/models';

import * as fromReducer from './employees.reducer';
import * as fromServices from '@app/admin-services/state';
import * as fromSchedules from '@app/admin-schedule/state';

import {storeName} from './employees.actions';
import {ToolbarEmployee} from '@admin/state/scheduling';
export {State, reducer} from './employees.reducer';
export {actions, storeName} from './employees.actions';

export interface EmployeeViewModel extends Employee {
  scheduleModel: Schedule;
  serviceModels: Service[];
}

const getFeature = createFeatureSelector<fromReducer.State>(storeName);

const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

const getViewModel: MemoizedSelector<object, EmployeeViewModel> = createSelector(
  baseSelectors.selectAll,
  fromSchedules.selectors.selectAll,
  fromServices.selectors.selectAll,
  baseSelectors.getCurrentId,
  (employees, schedules, serviceList, currentEmpId) => {
    if (currentEmpId === 0) {
      return {...Employee.fromJs({}), scheduleModel: undefined, serviceModels: undefined};
    }
    const employee = !!currentEmpId && !!employees ? employees.find(emp => emp.id === currentEmpId) : null;
    const scheduleModel = !!schedules && !!employee ? schedules.find(schedule => schedule.id === employee.schedule) : null;
    const serviceModels = !!serviceList && !!employee ? serviceList.filter(service => employee.services.includes(service.id)) : null;
    return {
      ...employee,
      scheduleModel,
      serviceModels
    };
  }
);

export const selectors = {
  ...baseSelectors,
  getViewModel
};

