import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Customer, CustomerAdapter} from '@api/models';
import {actions} from './customers.actions';


export interface State extends BaseEntityState<Customer> {
}


const initialState: State = {
  ...baseInitialState<Customer>(),
};


export const adapter = createBaseAdapter<Customer>(new CustomerAdapter());


export const reducer = createBaseReducer<Customer>(initialState, adapter, actions);
