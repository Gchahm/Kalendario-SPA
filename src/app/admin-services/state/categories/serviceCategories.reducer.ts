import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {ServiceCategory} from '@api/models';
import {actions} from './serviceCategories.actions';


export interface State extends BaseEntityState<ServiceCategory> {
}


const initialState: State = {
  ...baseInitialState<ServiceCategory>(),
};


export const adapter = createBaseAdapter<ServiceCategory>(ServiceCategory);


export const reducer = createBaseReducer<ServiceCategory>(initialState, adapter, actions);
