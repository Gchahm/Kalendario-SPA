import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {SchedulingPanel} from '@api/models';
import {actions} from './scheduling.actions';
import {Moment} from 'moment';
import * as moment from 'moment';
import {on} from '@ngrx/store';


export interface State extends BaseEntityState<SchedulingPanel> {
  date: Moment;
}


const initialState: State = {
  ...baseInitialState<SchedulingPanel>(),
  date: moment.utc()
};


export const adapter = createBaseAdapter<SchedulingPanel>(SchedulingPanel);


export const reducer = createBaseReducer<SchedulingPanel>(initialState, adapter, actions,
  on(actions.updateDate, (state, {date}) => ({...state, date: date.clone()})));
