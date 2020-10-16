import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {Service} from '@api/models';
import {actions} from './services.actions';


export interface State extends BaseEntityState<Service> {
}


const initialState: State = {
  ...baseInitialState<Service>(),
};


export const adapter = createBaseAdapter<Service>(Service);


export const reducer = createBaseReducer<Service>(initialState, adapter, actions);
