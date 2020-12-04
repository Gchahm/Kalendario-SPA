import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {ICustomer} from '@api/models';



export const storeName = 'adminCustomers';


interface CustomersActions extends BaseEntityActions<ICustomer> {
}


export const actions: CustomersActions = {
  ...createActions<ICustomer>(storeName),
};
