import {Employee} from '../core/models/Employee';
import {Service} from '../core/models/Service';
import {Schedule} from '../core/models/Schedule';
import {Shift} from '../core/models/Shift';
import {
  CREATE_CUSTOMER,
  CREATE_EMPLOYEE,
  CREATE_SCHEDULE,
  CREATE_SERVICE,
  CREATE_SHIFT, DELETE_CUSTOMER,
  DELETE_EMPLOYEE,
  DELETE_SCHEDULE,
  DELETE_SERVICE,
  DELETE_SHIFT,
  LOAD_CUSTOMERS,
  LOAD_EMPLOYEES,
  LOAD_SCHEDULES,
  LOAD_SERVICES,
  LOAD_SHIFTS,
  SELECT_MODEL,
  TOGGLE_EDIT,
  UPDATE_CUSTOMER,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_PHOTO,
  UPDATE_SCHEDULE,
  UPDATE_SERVICE,
  UPDATE_SHIFT
} from './AdminActions';
import {tassign} from 'tassign';
import {IReadModel} from '../core/models/interfaces/IReadModel';
import {Customer} from '../core/models/Customer';

interface DashboardState {
  editMode: boolean;
  isLoading: boolean;
}

export interface IAdminStore {
  selectedModel: IReadModel;
  employees: Employee[];
  services: Service[];
  schedules: Schedule[];
  shifts: Shift[];
  customers: Customer[];
  dashboardState: DashboardState;
}

export const ADMIN_INITIAL_STATE: IAdminStore = {
  selectedModel: null,
  employees: [],
  services: [],
  schedules: [],
  shifts: [],
  customers: [],
  dashboardState: {editMode: false, isLoading: false}
};


function toggleEdit(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    dashboardState: tassign(state.dashboardState, {editMode: !state.dashboardState.editMode})
  });
}

function selectModel(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    dashboardState: tassign(state.dashboardState, {editMode: false}),
    selectedModel: action.model
  });
}

function loadEmployees(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    employees: action.modelList,
  });
}

function updateEmployee(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    employees: state.employees.map((m) => m.id === action.model.id ? action.model : m),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function createEmployee(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    employees: state.employees.concat([action.model]),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function deleteEmployee(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    employees: state.employees.filter((m) => m.id !== action.id)
  });
}

// TODO: Check why this action is triggering a selectModel action
function updateEmployeePhoto(state: IAdminStore, action): IAdminStore {
  let selectedEmp = state.selectedModel;
  const empList = state.employees.map((m) => {
    if (m.id === action.id) {
      const emp = new Employee();
      Object.assign(emp, m, {photoUrl: action.url});
      m = emp;
      selectedEmp = emp;
    }
    return m;
  });
  return tassign(state, {
    employees: empList,
    selectedModel: selectedEmp,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function loadServices(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    services: action.modelList
  });
}

function updateService(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    services: state.services.map((m) => m.id === action.model.id ? action.model : m),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function createService(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    services: state.services.concat([action.model]),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function deleteService(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    services: state.services.filter((m) => m.id !== action.id)
  });
}

function loadShifts(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    shifts: action.modelList
  });
}

function updateShift(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    shifts: state.shifts.map((m) => m.id === action.model.id ? action.model : m),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function createShift(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    shifts: state.shifts.concat([action.model]),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function deleteShift(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    shifts: state.shifts.filter((m) => m.id !== action.id)
  });
}

function loadSchedules(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    schedules: action.modelList
  });
}

function updateSchedule(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    schedules: state.schedules.map((m) => m.id === action.model.id ? action.model : m),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function createSchedule(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    schedules: state.schedules.concat([action.model]),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function deleteSchedule(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    schedules: state.schedules.filter((m) => m.id !== action.id)
  });
}

function loadCustomers(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    customers: action.modelList
  });
}

function updateCustomer(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    customers: state.customers.map((m) => m.id === action.model.id ? action.model : m),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function createCustomer(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    customers: state.customers.concat([action.model]),
    selectedModel: action.model,
    dashboardState: tassign(state.dashboardState, {editMode: false})
  });
}

function deleteCustomer(state: IAdminStore, action): IAdminStore {
  return tassign(state, {
    customers: state.customers.filter((m) => m.id !== action.id)
  });
}

export function adminReducer(state: IAdminStore = ADMIN_INITIAL_STATE, action): IAdminStore {
  switch (action.type) {
    case   TOGGLE_EDIT:
      return toggleEdit(state, action);
    case LOAD_EMPLOYEES:
      return loadEmployees(state, action);
    case UPDATE_EMPLOYEE:
      return updateEmployee(state, action);
    case CREATE_EMPLOYEE:
      return createEmployee(state, action);
    case UPDATE_EMPLOYEE_PHOTO:
      return updateEmployeePhoto(state, action);
    case DELETE_EMPLOYEE:
      return deleteEmployee(state, action)
    case LOAD_SERVICES:
      return loadServices(state, action);
    case UPDATE_SERVICE:
      return updateService(state, action);
    case CREATE_SERVICE:
      return createService(state, action);
    case DELETE_SERVICE:
      return deleteService(state, action);
    case LOAD_SHIFTS:
      return loadShifts(state, action);
    case UPDATE_SHIFT:
      return updateShift(state, action);
    case CREATE_SHIFT:
      return createShift(state, action);
    case DELETE_SHIFT:
      return deleteShift(state, action);
    case LOAD_SCHEDULES:
      return loadSchedules(state, action);
    case UPDATE_SCHEDULE:
      return updateSchedule(state, action);
    case CREATE_SCHEDULE:
      return createSchedule(state, action);
    case DELETE_SCHEDULE:
      return deleteSchedule(state, action);
    case LOAD_CUSTOMERS:
      return loadCustomers(state, action);
    case UPDATE_CUSTOMER:
      return updateCustomer(state, action);
    case CREATE_CUSTOMER:
      return createCustomer(state, action);
    case DELETE_CUSTOMER:
      return deleteCustomer(state, action);
    case SELECT_MODEL:
      return selectModel(state, action);
  }
  return state;
}
