import {EntitySelectors} from '@ngrx/entity/src/models';
import {MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';
import {ApiError} from '@api/Errors';

export interface BaseEntitySelectors<T, V> extends EntitySelectors<T, V> {
  getIsInitialized: MemoizedSelector<V, boolean>;
  getEditMode: MemoizedSelector<V, boolean>;
  getApiError: MemoizedSelector<V, ApiError>;
  getSearchValue: MemoizedSelector<V, string>;
  getFilteredEntities: MemoizedSelector<V, T[]>;
  getCurrentId: MemoizedSelector<V, number>;
  getCurrent: MemoizedSelector<V, T>;
  getById: MemoizedSelectorWithProps<V, number, T | null>;
  getBySearch: MemoizedSelectorWithProps<V, string, T[]>;
  getIsLoadingEntities: MemoizedSelector<V, boolean>;
}

