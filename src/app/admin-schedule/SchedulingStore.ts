import {Employee} from '../core/models/Employee';
import {tassign} from 'tassign';
import {ADD_EMPLOYEE, REMOVE_EMPLOYEE, SELECT_DATE} from './SchedulingActions';

export interface ISchedulingStore {
  employees: Employee[];
}

export const SCHEDULING_INITIAL_STATE: ISchedulingStore = {
  employees: []
};

function addEmployee(state: ISchedulingStore, action): ISchedulingStore {
  const emp = action.employee;
  if (state.employees.findIndex(e => e.id === emp.id) === -1) {
    return tassign(state, {
      employees: state.employees.concat([emp])
    });
  }
}

function removeEmployee(state: ISchedulingStore, action): ISchedulingStore {
  return tassign(state, {
    employees: state.employees.filter(e => e.id !== action.employee.id)
  });
}

function selectDate(state: ISchedulingStore, action): ISchedulingStore {
  return state;
}


export function schedulingReducer(state: ISchedulingStore = SCHEDULING_INITIAL_STATE, action): ISchedulingStore {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return addEmployee(state, action);
    case REMOVE_EMPLOYEE:
      return removeEmployee(state, action);
    case SELECT_DATE:
      return selectDate(state, action);
  }
  return state;
}
