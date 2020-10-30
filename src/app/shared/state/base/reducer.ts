import {IReadModel} from '@api/models';
import {BaseEntityAdapter} from '@shared/state/base/adapter';
import {BaseEntityActions} from '@shared/state/base/actions';
import {On} from '@ngrx/store/src/reducer_creator';
import {createReducer, on} from '@ngrx/store';
import {BaseEntityState} from '@shared/state/base/state';

export function createBaseReducer<T extends IReadModel>(initialState: BaseEntityState<T>,
                                                        adapter: BaseEntityAdapter<T>,
                                                        actions: BaseEntityActions<T>,
                                                        ...ons: On<BaseEntityState<T>>[]) {
  return createReducer(initialState,
    on(actions.toggleEdit, (state, {value}) => ({...state, editMode: value})),
    on(actions.select, (state, {id}) => ({...state, selectedId: id})),
    on(actions.setSearch, (state, {value}) => ({...state, search: value})),
    on(actions.initializeCreate, (state, {}) => ({...state, selectedId: 0, editMode: true})),
    on(actions.alreadyInitialized, (state, {}) => ({...state})),
    on(actions.requestEntities, (state, {}) => ({...state, initialized: true})),
    on(actions.addMany, (state, {entities}) => adapter.adapter.addMany(entities, {
      ...state,
      selectedId: state.selectedId === null ? entities.map(e => e.id).find(i => i === i) : state.selectedId
    })),
    on(actions.upsertOne, (state, {entity}) => adapter.adapter.upsertOne(entity, {
      ...state,
      selectedId: entity.id,
      editMode: false,
      apiError: null
    })),
    on(actions.updateOne, (state, {update}) => adapter.adapter.updateOne(update, {
      ...state,
      selectedId: update.id,
      editMode: false,
      apiError: null
    })),
    on(actions.addOne, (state, {entity}) => adapter.adapter.addOne(entity, {
      ...state,
      selectedId: entity.id,
      editMode: false,
      apiError: null
    })),
    on(actions.removeOne, (state, {id}) => adapter.adapter.removeOne(id, {...state, selectedId: null, apiError: null})),
    on(actions.setError, (state, {error}) => ({...state, apiError: error})),
    ...ons
  );
}
