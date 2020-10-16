import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {SchedulingPanel} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {Moment} from 'moment';


export const storeName = 'adminScheduling';


interface SchedulingActions extends BaseEntityActions<SchedulingPanel> {
  updateDate: ActionCreator<string, (props: {date: Moment}) => ({date: Moment} & TypedAction<string>)>;
}


export const actions: SchedulingActions = {
  ...createActions<SchedulingPanel>(storeName),
  updateDate: createAction(`[${storeName}] Update Date`, props<{date: Moment}>()),
};
