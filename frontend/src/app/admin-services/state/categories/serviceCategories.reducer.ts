import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {ServiceCategory, ServiceCategoryAdapter} from '@api/models';
import {actions} from './serviceCategories.actions';


export interface State extends BaseEntityState<ServiceCategory> {
}


const initialState: State = {
  ...baseInitialState<ServiceCategory>(),
};


export const adapter = createBaseAdapter<ServiceCategory>(new ServiceCategoryAdapter());


export const reducer = createBaseReducer<ServiceCategory>(initialState, adapter, actions);
