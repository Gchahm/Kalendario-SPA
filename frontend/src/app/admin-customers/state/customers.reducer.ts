import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {ICustomer, CustomerAdapter} from '@api/models';
import {actions} from './customers.actions';


export interface State extends BaseEntityState<ICustomer> {
}


const initialState: State = {
  ...baseInitialState<ICustomer>(),
};


export const adapter = createBaseAdapter<ICustomer>(new CustomerAdapter());


export const reducer = createBaseReducer<ICustomer>(initialState, adapter, actions);
