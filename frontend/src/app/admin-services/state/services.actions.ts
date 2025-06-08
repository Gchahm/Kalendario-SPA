import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {Service} from '@api/models';


export const storeName = 'adminServices';


interface ShiftsActions extends BaseEntityActions<Service> {
}


export const actions: ShiftsActions = {
  ...createActions<Service>(storeName),
};
