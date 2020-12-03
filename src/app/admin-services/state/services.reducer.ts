import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Service, ServiceAdapter} from '@api/models';
import {actions} from './services.actions';


export interface State extends BaseEntityState<Service> {
}


const initialState: State = {
  ...baseInitialState<Service>(),
};


export const adapter = createBaseAdapter<Service>(new ServiceAdapter());


export const reducer = createBaseReducer<Service>(initialState, adapter, actions);
