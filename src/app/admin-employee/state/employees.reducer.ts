import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Employee, EmployeeAdapter} from '@api/models/Employee';
import {actions} from './employees.actions';


export interface State extends BaseEntityState<Employee> {
}


const initialState: State = {
  ...baseInitialState<Employee>(),
};


export const adapter = createBaseAdapter<Employee>(new EmployeeAdapter())


export const reducer = createBaseReducer<Employee>(initialState, adapter, actions);

