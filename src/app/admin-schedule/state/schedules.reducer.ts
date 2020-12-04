import {BaseEntityState, baseInitialState, createBaseAdapter, createBaseReducer} from '@shared/state/base';
import {ISchedule, ScheduleAdapter} from '@api/models';
import {actions} from './schedules.actions';


export interface State extends BaseEntityState<ISchedule> {
}


const initialState: State = {
  ...baseInitialState<ISchedule>(),
};


export const adapter = createBaseAdapter<ISchedule>(new ScheduleAdapter());


export const reducer = createBaseReducer<ISchedule>(initialState, adapter, actions);
