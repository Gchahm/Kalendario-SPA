import {ApiError} from '@api/Errors';
import * as actions from './customers.actions';
import {RequestModel} from '@api/models';
import * as fromApp from '@app/state';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';


export const storeName = 'customers';


export interface State extends fromApp.State {
  [storeName]: CustomersState;
}


export interface CustomersState extends EntityState<RequestModel> {
  selectedRequestId: number;
  apiError: ApiError | null;
}


const initialState: CustomersState = {
  ids: [],
  entities: {},
  selectedRequestId: null,
  apiError: null
};


export const adapter: EntityAdapter<RequestModel> = createEntityAdapter<RequestModel>();


export const reducer = createReducer(
  initialState,
  on(actions.setAll, (state, {entities}) => adapter.setAll(entities, state)),
  on(actions.upsertMany, (state, {entities}) => adapter.upsertMany(entities, state)),
  on(actions.addOne, (state, {entity}) => adapter.addOne(entity, state)),
  on(actions.setError, (state, {error}) => ({...state, apiError: error})),
  on(actions.setSelectedId, (state, {id}) => ({...state, selectedRequestId: id})),
);
