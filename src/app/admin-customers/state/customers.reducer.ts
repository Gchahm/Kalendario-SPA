import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Customer} from '@api/models';
import {actions} from './customers.actions';


export interface State extends BaseEntityState<Customer> {
}


const initialState: State = {
  ...baseInitialState<Customer>(),
};


export const adapter = createBaseAdapter<Customer>(Customer);


export const reducer = createBaseReducer<Customer>(initialState, adapter, actions);
