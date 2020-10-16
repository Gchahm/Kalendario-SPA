import * as fromAppointments from '../../admin-appointments/state';
import * as fromCustomers from '../../admin-customers/state';
import * as fromEmployees from '../../admin-employee/state';
import * as fromSchedules from '../../admin-schedule/state';
import * as fromScheduling from './scheduling';
import * as fromRequests from './requests';
import * as fromServices from '../../admin-services/state';
import * as fromServiceCat from '../../admin-services/state/categories';
import * as fromApp from '@app/state';
import {storeName} from '@app/admin-employee/state/employees.actions';

export interface State extends fromApp.State {
  [fromAppointments.storeName]: fromAppointments.State;
  [fromCustomers.storeName]: fromCustomers.State;
  [storeName]: fromEmployees.State;
  [fromSchedules.storeName]: fromSchedules.State;
  [fromScheduling.storeName]: fromScheduling.State;
  [fromRequests.storeName]: fromRequests.State;
  [fromServices.storeName]: fromServices.State;
  [fromServiceCat.storeName]: fromServiceCat.State;
}


