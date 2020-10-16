import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Employee} from '@api/models/Employee';
import {actions} from './employees.actions';


export interface State extends BaseEntityState<Employee> {
}


const initialState: State = {
  ...baseInitialState<Employee>(),
};


export const adapter = createBaseAdapter<Employee>(Employee)


export const reducer = createBaseReducer<Employee>(initialState, adapter, actions);

