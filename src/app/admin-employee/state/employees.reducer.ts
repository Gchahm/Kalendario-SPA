import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {IEmployee, EmployeeAdapter} from '../../api/models/IEmployee';
import {actions} from './employees.actions';


export interface State extends BaseEntityState<IEmployee> {
}


const initialState: State = {
  ...baseInitialState<IEmployee>(),
};


export const adapter = createBaseAdapter<IEmployee>(new EmployeeAdapter())


export const reducer = createBaseReducer<IEmployee>(initialState, adapter, actions);

