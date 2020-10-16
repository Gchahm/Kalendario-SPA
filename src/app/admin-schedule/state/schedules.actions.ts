import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {Schedule} from '@api/models';


export const storeName = 'adminSchedules';


interface SchedulesActions extends BaseEntityActions<Schedule> {
}


export const actions: SchedulesActions = {
  ...createActions<Schedule>(storeName),
};
