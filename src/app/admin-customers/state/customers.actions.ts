import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {Customer} from '@api/models';



export const storeName = 'adminCustomers';


interface CustomersActions extends BaseEntityActions<Customer> {
}


export const actions: CustomersActions = {
  ...createActions<Customer>(storeName),
};
