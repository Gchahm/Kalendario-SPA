import {IReadModel} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {ApiError} from '@api/Errors';
import {Params} from '@api/clients/ModelViewSetClient';
import {Update} from '@ngrx/entity/src/models';

export interface BaseEntityActions<T extends IReadModel> {
  requestEntities: ActionCreator<string, (props: {params: Params}) => ( {params: Params} & TypedAction<string>)>;
  requestEntity: ActionCreator<string, (props: { id: number }) => ({id: number} & TypedAction<string>)>;
  requestUpdate: ActionCreator<string, (props: { entity: T }) => ({ entity: T } & TypedAction<string>)>;
  requestCreate: ActionCreator<string, (props: { entity: T }) => ({ entity: T } & TypedAction<string>)>;
  requestDelete: ActionCreator<string, (props: { id: number }) => ({ id: number } & TypedAction<string>)>;

  toggleEdit: ActionCreator<string, (props: { value: boolean }) => ({ value: boolean } & TypedAction<string>)>;
  select: ActionCreator<string, (props: { id: number }) => ({ id: number } & TypedAction<string>)>;
  setSearch: ActionCreator<string, (props: { value: string }) => ({ value: string } & TypedAction<string>)>;
  initializeCreate: ActionCreator<string, (props: {}) => ({} & TypedAction<string>)>;
  initializeStore: ActionCreator<string, (props: {params: Params}) => ({params: Params} & TypedAction<string>)>;
  alreadyInitialized: ActionCreator<string, (props: {}) => ({} & TypedAction<string>)>;
  openFormDialog: ActionCreator<string, (props: {id: number}) => ({id: number} & TypedAction<string>)>;

  setAll: ActionCreator<string, (props: { entities: T[] }) => ({ entities: T[] } & TypedAction<string>)>;
  addMany: ActionCreator<string, (props: { entities: T[] }) => ({ entities: T[] } & TypedAction<string>)>;
  upsertOne: ActionCreator<string, (props: { entity: T }) => ({ entity: T } & TypedAction<string>)>;
  updateOne: ActionCreator<string, (props: { update: Update<T> }) => ({ update: Update<T> } & TypedAction<string>)>;
  addOne: ActionCreator<string, (props: { entity: T }) => ({ entity: T } & TypedAction<string>)>;
  removeOne: ActionCreator<string, (props: { id: number }) => ({ id: number } & TypedAction<string>)>;
  setError: ActionCreator<string, (props: { error: ApiError }) => ({ error: ApiError } & TypedAction<string>)>;
}

export function createActions<T extends IReadModel>(name: string): BaseEntityActions<T> {
  return {
    requestEntities: createAction(`[${name}] Request Entities`, props<{params: Params}>()),
    requestEntity: createAction(`[${name}] Request Entity`, props<{id: number}>()),
    requestUpdate: createAction(`[${name}] Request Update`, props<{ entity: T }>()),
    requestCreate: createAction(`[${name}] Request Create`, props<{ entity: T }>()),
    requestDelete: createAction(`[${name}] Request Delete`, props<{ id: number }>()),

    toggleEdit: createAction(`[${name}] Toggle Edit`, props<{ value: boolean }>()),
    select: createAction(`[${name}] Select Entity`, props<{ id: number }>()),
    setSearch: createAction(`[${name}] Set Search`, props<{ value: string }>()),
    initializeCreate: createAction(`[${name}] Initialize Create`, props<{}>()),
    initializeStore: createAction(`[${name}] Initialize Store`, props<{params: Params}>()),
    alreadyInitialized: createAction(`[${name}] Already Initialized`, props<{}>()),
    openFormDialog: createAction(`[${name}] Open Create Dialog`, props<{id: number}>()),

    setAll: createAction(`[${name}] Set All Entities`, props<{ entities: T[] }>()),
    addMany: createAction(`[${name}] Add Many Entities`, props<{ entities: T[] }>()),
    upsertOne: createAction(`[${name}] Upsert One`, props<{ entity: T }>()),
    updateOne: createAction(`[${name}] Update One`, props<{ update: Update<T> }>()),
    addOne: createAction(`[${name}] Add One`, props<{ entity: T }>()),
    removeOne: createAction(`[${name}] Remove One`, props<{ id: number }>()),
    setError: createAction(`[${name}] Set API Error`, props<{ error: ApiError }>()),
  };
}
