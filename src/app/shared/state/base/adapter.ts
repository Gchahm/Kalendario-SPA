import {IReadModel} from '@api/models';
import {Dictionary, EntityAdapter} from '@ngrx/entity/src/models';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {BaseEntitySelectors} from '@shared/state/base/selectors';
import {createSelector} from '@ngrx/store';
import {BaseEntityState} from '@shared/state/base/state';
import {Adapter} from '@api/adapter';

export interface BaseEntityAdapter<T extends IReadModel> {
  adapter: EntityAdapter<T>;
  getBaseSelectors<V>(selectState: (state: V) => EntityState<T>,
                      filter: (m: T, s: string) => boolean): BaseEntitySelectors<T, V>;
}

export function createBaseAdapter<T extends IReadModel>(adapter: Adapter<T>): BaseEntityAdapter<T> {
  return new BaseAdapter<T>(adapter);
}

class BaseAdapter<T extends IReadModel> implements BaseEntityAdapter<T> {

  adapter: EntityAdapter<T>;

  constructor(private modelAdapter: Adapter<T>) {
    this.adapter = createEntityAdapter<T>();
  }

  create(): T {
    return this.modelAdapter.adapt({});
  }

  getBaseSelectors<V>(selectState: (state: V) => BaseEntityState<T>,
                      filterFn: (m: T, s: string) => boolean): BaseEntitySelectors<T, V> {
    const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = this.adapter.getSelectors(selectState);

    const getEditMode = createSelector(
      selectState,
      state => state.editMode
    );

    const getApiError = createSelector(
      selectState,
      state => state.apiError
    );

    const getSearchValue = createSelector(
      selectState,
      state => state.search
    );

    const getFilteredEntities = createSelector(
      selectAll,
      getSearchValue,
      (entities, search) => entities.filter(e => filterFn(e, search))
    );

    const getCurrentId = createSelector(
      selectState,
      state => state.selectedId
    );

    const getIsInitialized = createSelector(
      selectState,
      state => state.initialized
    );

    const getCurrent = createSelector(
      selectAll,
      getCurrentId,
      (entities, id) => {
        if (id === 0) {
          return this.create();
        }
        return id ? entities.find(e => e.id === id) : null;
      }
    );

    const getById = createSelector(
      selectEntities,
      selectIds,
      (entities: Dictionary<T>, ids: number[], id: number) => ids.includes(id) ? entities[id] : null
    );

    const getBySearch = createSelector(
      selectAll,
      (entities: T[], search: string) => entities.filter(e => filterFn(e, search))
    );

    const getIsLoadingEntities = createSelector(
      selectState,
      state => state.isLoadingEntities
    );

    return {
      selectIds,
      selectEntities,
      getIsInitialized,
      selectAll,
      selectTotal,
      getEditMode,
      getApiError,
      getSearchValue,
      getFilteredEntities,
      getCurrentId,
      getCurrent,
      getById,
      getBySearch,
      getIsLoadingEntities,
    };
  }

}

