import {createAction, props} from '@ngrx/store';
import {RequestModel} from '@api/models';
import {ApiError} from '@api/Errors';
import {Moment} from 'moment';

export const initializeStore = createAction('[Customers] Initialize Store', props<{date: Moment}>());
export const requestEntities = createAction('[Customers] Request Entities', props<{date: Moment}>());
export const requestEntity = createAction('[Customers] Request Entity', props<{id: number}>());
export const upsertMany = createAction('[Customers] Upsert Many', props<{entities: RequestModel[]}>());
export const setAll = createAction('[Customers] Set All', props<{entities: RequestModel[]}>());
export const addOne = createAction('[Customers] Add One', props<{entity: RequestModel}>());
export const setError = createAction('[Customers] Set Error', props<{error: ApiError}>());
export const setSelectedId = createAction('[Customers] Set Selected Id', props<{id: number}>());

