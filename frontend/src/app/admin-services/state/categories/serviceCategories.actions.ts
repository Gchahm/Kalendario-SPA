import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {ServiceCategory} from '@api/models';


export const storeName = 'adminServiceCategories';


interface ShiftsActions extends BaseEntityActions<ServiceCategory> {
}


export const actions: ShiftsActions = {
  ...createActions<ServiceCategory>(storeName),
};
