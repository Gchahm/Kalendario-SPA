import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {RequestAdapter, RequestModel} from '@api/models';
import {actions} from './requests.actions';
import {on} from '@ngrx/store';


export interface State extends BaseEntityState<RequestModel> {
}


const initialState: State = {
  ...baseInitialState<RequestModel>(),
};


export const adapter = createBaseAdapter<RequestModel>(new RequestAdapter());


export const reducer = createBaseReducer<RequestModel>(initialState, adapter, actions,
  on(actions.selectNext, (state, {}) => ({
    ...state,
    selectedId: state.ids.length > 0 ? +state.ids[0] : null
  }))
);
