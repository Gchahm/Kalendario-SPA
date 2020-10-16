import {EntityState} from '@ngrx/entity';
import {ApiError} from '@api/Errors';

export interface BaseEntityState<T> extends EntityState<T> {
  initialized: boolean;
  apiError: ApiError | null;
  editMode: boolean;
  selectedId: number | null;
  search: string;
}

export function baseInitialState<T>(): BaseEntityState<T> {
  return {
    ids: [],
    entities: {},
    initialized: false,
    apiError: null,
    editMode: false,
    selectedId: null,
    search: ''
  };
}
