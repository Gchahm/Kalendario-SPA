import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {RequestModel} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';


export const storeName = 'adminRequests';


interface RequestsActions extends BaseEntityActions<RequestModel> {
  acceptRequest: ActionCreator<string, (props: { id: number }) => ({ id: number } & TypedAction<string>)>;
  rejectRequest: ActionCreator<string, (props: { id: number }) => ({ id: number } & TypedAction<string>)>;
  selectNext: ActionCreator<string, (props: {}) => ({} & TypedAction<string>)>;
}


export const actions: RequestsActions = {
  ...createActions<RequestModel>(storeName),
  acceptRequest: createAction(`[${storeName}] Accept Request`, props<{ id: number }>()),
  rejectRequest: createAction(`[${storeName}] Reject Request`, props<{ id: number }>()),
  selectNext: createAction(`[${storeName}] Select Next`, props<{}>()),
};
