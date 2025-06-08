import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {ISchedule} from '@api/models';


export const storeName = 'adminSchedules';


interface SchedulesActions extends BaseEntityActions<ISchedule> {
}


export const actions: SchedulesActions = {
  ...createActions<ISchedule>(storeName),
};
